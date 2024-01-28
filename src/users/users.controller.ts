import {
    Controller,
    Body,
    Post,
    Get,
    Request,
    UseGuards
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

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
    async loginUser(@Request() req) {
        return { status_code: 200, message: "Successfully logged in!" };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    async getAuthenticatedUser(@Request() req) {
        return req.user;
    }
}
