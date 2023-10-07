import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { LoginPayloadDto } from './dtos/loginPaylod.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password are invalid!');
    }

    return {
      access_token: this.jwtService.sign({
        ...new LoginPayloadDto(user),
      }),
      user: new ReturnUserDto(user),
    };
  }
}
