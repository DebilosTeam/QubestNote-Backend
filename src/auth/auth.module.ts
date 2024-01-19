import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./auth.constants";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret
    })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {
  constructor(private authService: AuthService) {}
}