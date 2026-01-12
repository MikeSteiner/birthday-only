import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { BirthdaysModule } from '../birthdays/birthdays.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [BirthdaysModule, UsersModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
