import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './auth.session.serializer';



@Module({
    imports: [UsersModule, PassportModule.register({
        session: true
    })
    ],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})

export class AuthModule {}
