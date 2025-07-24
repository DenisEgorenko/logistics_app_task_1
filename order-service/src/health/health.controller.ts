import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): string {
    return 'order-service is available';
  }
}
