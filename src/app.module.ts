import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

import { TextsController } from './texts/texts.controller';
import { TextsService } from './texts/texts.service';

import { RedisController } from './redis/redis.controller';
import { RedisModule } from './redis/redis.module';
import { MailerModule } from './mailer/mailer.module';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    DatabaseModule, 
    RedisModule, 
    MailerModule],
  controllers: [TextsController, RedisController],
  providers: [TextsService]
})

export class AppModule {
  static port: string
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT')
  }
}
