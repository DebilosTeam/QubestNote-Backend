import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        if(user && await argon2.verify(user.password, password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
