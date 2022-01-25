import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { Player } from '../player/player.schema';
import { PlayerService } from '../player/player.service';
import { Game } from './game.schema';
import { GameService } from './game.service';

import { CreatePlayerDto } from '../player/dto/create-player.dto';
import { UpdatePlayerDto } from '../player/dto/update-player.dto';
import { PlayerDto } from '../player/dto/player.dto';
import { CreateGameDto } from './dto/create-game.dto';

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    await this.playerService.editBySessionId(client.id, { sessionId: null });
  }

  @SubscribeMessage('game:create')
  async handleGameCreate(
    client: Socket,
    payload: CreateGameDto,
  ): Promise<void> {
    const game = await this.gameService.create(payload);
    const games = await this.gameService.findAll();
    this.server.to(client.id).emit('game:created', game.id);
    this.server.emit('game:listed', games);
  }

  @SubscribeMessage('game:list')
  async handleGameList(client: Socket): Promise<void> {
    const games = await this.gameService.findAll();
    this.server.to(client.id).emit('game:listed', games.map(Game.toResponse));
  }

  @SubscribeMessage('game:player:list')
  async handleGamePlayerList(client: Socket, payload: string): Promise<void> {
    const players = await this.playerService.findAllByGameId(payload);
    this.server
      .in(payload)
      .emit('game:player:listed', players.map(Player.toResponse));
  }

  @SubscribeMessage('game:player:edit')
  async handleGamePlayerEdit(
    client: Socket,
    payload: UpdatePlayerDto,
  ): Promise<void> {
    const player = await this.playerService.editById(payload.id, payload);
    const players = await this.playerService.findAllByGameId(player.gameId);
    this.server
      .in(String(player.gameId))
      .emit('game:player:listed', players.map(Player.toResponse));
  }

  @SubscribeMessage('game:join')
  async handleGameJoin(
    client: Socket,
    payload: CreatePlayerDto & { id: string },
  ): Promise<void> {
    let player = await this.playerService.findById(payload.id);
    if (!player) {
      player = await this.playerService.create(payload);
    }
    player.sessionId = client.id;
    await player.save();

    client.join(String(player.gameId));

    const players = await this.playerService.findAllByGameId(player.gameId);
    this.server
      .to(String(player.gameId))
      .emit('game:player:listed', players.map(Player.toResponse));
    this.server
      .to(client.id)
      .emit('game:self:joined', Player.toResponse(player));
  }

  @SubscribeMessage('game:leave')
  async handleGameLeave(client: Socket, payload: PlayerDto): Promise<void> {
    const sockets = this.server.sockets as any;
    const socket = sockets.get(payload.sessionId);

    await this.playerService.deleteById(payload.id);
    socket.leave(String(payload.gameId));

    const players = await this.playerService.findAllByGameId(payload.gameId);

    this.server
      .in(String(payload.gameId))
      .emit('game:player:listed', players.map(Player.toResponse));
    this.server.to(socket.id).emit('game:leaved');
  }
}
