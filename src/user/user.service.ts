import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await hash(createUserDto.password, 10);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async getUserById(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['addresses'],
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('UserId not found');
    }

    return user;
  }
}
