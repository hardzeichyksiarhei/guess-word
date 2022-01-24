import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

import { Player } from '../player/player.schema';
import { PlayerService } from '../player/player.service';
import { CreatePlayerDto } from '../player/dto/player-game.dto';

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

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('game:create')
  async handleGameCreate(
    client: Socket,
    payload: CreateGameDto,
  ): Promise<void> {
    const game = await this.gameService.create(payload);
    this.server.to(client.id).emit('game:created', game.id);
  }

  @SubscribeMessage('game:player:list')
  async handleGamePlayerList(
    client: Socket,
    payload: { gameId: string },
  ): Promise<void> {
    const players = await this.playerService.findAllByGameId(payload.gameId);
    this.server.emit('game:player:listed', players.map(Player.toResponse));
  }

  @SubscribeMessage('game:join')
  async handleGameJoin(
    client: Socket,
    payload: CreatePlayerDto,
  ): Promise<void> {
    const player = await this.playerService.create(payload);
    client.join(payload.gameId);
    client.broadcast.emit('game:joined', Player.toResponse(player));
    this.server.to(client.id).emit('game:self:joined', player._id);
  }
}
