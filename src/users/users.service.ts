import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    async insertUser(createUserDto: CreateUserDto) {
        const newUser = new Users(createUserDto);
        await this.usersRepository.save(newUser);

        return { message: `User ${createUserDto.username} successfully created!` }
    }

    async findOne(username: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({
            where: {
                username: username
            }
        })
    }
    async findById(id: number): Promise<User | undefined> {
        return await this.usersRepository.findOne({
            where: {
                id: id
            }
        })
    }
}
