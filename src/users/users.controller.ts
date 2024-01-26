import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
      private readonly usersService: UsersService
    ) {}
  
    @Post("signup")
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.insert(createUserDto);
    }
    
    // @Post("signin")
    // async loginAccount(@Body() userInput: Prisma.usersCreateInput) {
    //   return this.usersService.enter(userInput);
    // }
}
