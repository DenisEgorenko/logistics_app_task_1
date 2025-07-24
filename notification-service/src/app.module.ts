import { Module } from '@nestjs/common';
import { NotificationGateway } from './gateways/notification.gateway';

@Module({
  providers: [NotificationGateway]
})
export class AppModule {}