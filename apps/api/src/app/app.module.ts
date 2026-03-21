import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { BirthdaysModule } from './birthdays/birthdays.module';
import { ImportExportModule } from './import-export/import-export.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/birthday-app',
      }),
      inject: [ConfigService],
    }),

    // Scheduler for cron jobs
    ScheduleModule.forRoot(),

    // Feature modules
    AuthModule,
    UsersModule,
    BirthdaysModule,
    ImportExportModule,
    NotificationsModule,
  ],
})
export class AppModule {}
