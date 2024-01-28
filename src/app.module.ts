import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';

import { DatabaseModule } from './database/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, 
    DatabaseModule, 
    AuthModule,
    PassportModule.register({
      session: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
