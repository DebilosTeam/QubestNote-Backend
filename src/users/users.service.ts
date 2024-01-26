import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(Users)
      private readonly usersRepository: Repository<Users>
    ) {};

    async insert(createUserDto: CreateUserDto) {
      const users = new Users(createUserDto)
    
      await this.usersRepository.save(users);
      return { message: `User ${createUserDto.username} successfully created!` }
    }
    
      // async enter(loginUserDto: Prisma.usersCreateInput) {
      //   const user = await this.database.users.findUnique({ where: { username: loginUserDto.username } })
    
      //   if(!user) {
      //     throw new NotFoundException(
      //       "User with this username not found!"
      //     )
      //   };
    
      //   const comparePassword = await argon2.verify(user.password, loginUserDto.password);
    
      //   if(!comparePassword) {
      //     throw new UnauthorizedException(
      //       "Wrong password!"
      //     );
      //   }
    
      //   return { meesage: 'Successful login on!' }
      // }
}
