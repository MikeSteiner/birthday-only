import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import * as webpush from 'web-push';
import { BirthdaysService } from '../birthdays/birthdays.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private birthdaysService: BirthdaysService,
    private usersService: UsersService,
    private configService: ConfigService
  ) {
    // Configure web-push with VAPID keys
    const vapidPublicKey = this.configService.get<string>('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = this.configService.get<string>('VAPID_PRIVATE_KEY');
    const vapidSubject = this.configService.get<string>('VAPID_SUBJECT') || 'mailto:admin@birthdayapp.com';

    if (vapidPublicKey && vapidPrivateKey) {
      webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
    } else {
      this.logger.warn('VAPID keys not configured. Push notifications will not work.');
    }
  }

  // Run every day at 9:00 AM
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async checkBirthdaysAndNotify() {
    this.logger.log('Running daily birthday check...');

    try {
      const todaysBirthdays = await this.birthdaysService.getTodaysBirthdays();

      for (const birthday of todaysBirthdays) {
        const user = await this.usersService.findById(birthday.userId.toString());
        
        if (user && user.pushSubscription) {
          await this.sendPushNotification(user.pushSubscription, {
            title: '🎉 Birthday Reminder',
            body: `Today is ${birthday.name}'s birthday!${
              birthday.age ? ` They turn ${birthday.age} years old.` : ''
            }`,
            data: { birthdayId: birthday._id },
          });
        }
      }

      this.logger.log(`Sent ${todaysBirthdays.length} birthday notifications`);
    } catch (error) {
      this.logger.error('Error checking birthdays:', error);
    }
  }

  async sendPushNotification(subscription: any, payload: any): Promise<void> {
    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify(payload)
      );
      this.logger.log('Push notification sent successfully');
    } catch (error: any) {
      this.logger.error('Error sending push notification:', error);
      
      // If subscription is invalid, you might want to remove it from the database
      if (error?.statusCode === 410) {
        this.logger.warn('Subscription has expired or is no longer valid');
      }
    }
  }

  async testNotification(userId: string): Promise<void> {
    const user = await this.usersService.findById(userId);
    
    if (!user || !user.pushSubscription) {
      throw new Error('User has no push subscription');
    }

    await this.sendPushNotification(user.pushSubscription, {
      title: '🔔 Test Notification',
      body: 'Your birthday notifications are set up correctly!',
      data: { test: true },
    });
  }

  // Generate VAPID keys (run once and save to environment variables)
  generateVapidKeys() {
    const vapidKeys = webpush.generateVAPIDKeys();
    this.logger.log('VAPID Keys generated:');
    this.logger.log('Public Key:', vapidKeys.publicKey);
    this.logger.log('Private Key:', vapidKeys.privateKey);
    return vapidKeys;
  }
}
