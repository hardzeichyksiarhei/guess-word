import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateGameDto } from './dto/create-game.dto';

import { GameService } from './game.service';

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

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
    this.server.emit('game:created', game.id);
  }

  @SubscribeMessage('game:join')
  handleGameJoin(client: Socket, payload: string): void {
    this.server.emit('game:start', payload);
  }
}
