import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService
  ) {}

  @Get('vapid-public-key')
  getVapidPublicKey() {
    return {
      publicKey: this.configService.get<string>('VAPID_PUBLIC_KEY'),
    };
  }

  @Post('test')
  async testNotification(@Request() req: any) {
    await this.notificationsService.testNotification(req.user.userId);
    return { message: 'Test notification sent' };
  }
}
