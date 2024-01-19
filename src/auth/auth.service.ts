import { Injectable, ConflictException, NotFoundException, UnauthorizedException  } from "@nestjs/common";
import { users, Prisma } from '@prisma/client';
import { DatabaseService } from "../database/database.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService) {}

  async create(createUserDto: Prisma.usersCreateInput) {
    const users = await this.database.users.findFirst({
        where: {
          OR: [
            {username: createUserDto.username},
            {email: createUserDto.email}
          ]
        }
    });

    if (users) {
      throw new ConflictException(
        "User with this email or username already exists!"
      )
    }

    const hashedPassword = await argon2.hash(
      createUserDto.password
    );

    createUserDto.password = hashedPassword;

    await this.database.users.create({ data: createUserDto });
    return { message: `User ${createUserDto.username} successfully created!`, accessToken: this.jwtService.sign({ username: createUserDto.username }) }
  }

  async login(loginUserDto: Prisma.usersCreateInput) {
    const user = await this.database.users.findUnique({ where: { username: loginUserDto.username } })

    if(!user) {
      throw new NotFoundException(
        "User with this username not found!"
      )
    };

    const comparePassword = await argon2.verify(user.password, loginUserDto.password);

    if(!comparePassword) {
      throw new UnauthorizedException(
        "Wrong password!"
      );
    }

    return { accessToken: this.jwtService.sign({ username: loginUserDto.username })}
  }
}