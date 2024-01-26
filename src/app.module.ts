import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    DatabaseModule, UsersModule],
  controllers: [],
  providers: []
})

export class AppModule {
  static port: string
  static session_secret: string
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT')
    AppModule.session_secret = configService.get('SESSION_SECRET')
  }
}
