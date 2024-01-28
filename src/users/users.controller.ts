import {
    Controller,
    Body,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.insertUser(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async loginUser() {}
}
