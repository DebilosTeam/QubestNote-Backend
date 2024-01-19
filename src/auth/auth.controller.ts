import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "./auth.guard";

@Controller("accounts")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async createAccount(@Body() userInput: Prisma.usersCreateInput) {
    return this.authService.create(userInput);
  }
  
  @Post("login")
  async loginAccount(@Body() userInput: Prisma.usersCreateInput) {
    return this.authService.login(userInput);
  }

  @UseGuards(AuthGuard)
  @Get("test")
  async test() {
    return "Hello World"
  }
}