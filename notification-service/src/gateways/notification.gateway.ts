import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // адрес фронта
    credentials: true,
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Клиент подключен:', client.id);
    client.emit('connected', {
      message: 'WebSocket соединение установлено',
      socketId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Клиент отключен:', client.id);
  }

  // Можно добавлять emit/receive позже
}
