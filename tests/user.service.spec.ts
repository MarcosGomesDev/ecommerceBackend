import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { userEntityMock } from '@mocks/user.mock';
import { createUserMock } from '@mocks/createUser.mock';
import {
  invalidUpdatePasswordMock,
  updatePasswordMock,
} from '@mocks/updateUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return user in getUserById', async () => {
    const user = await service.getUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exists', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow();
  });

  it('should return error if user not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return user in update password', async () => {
    const user = await service.updatePasswordUser(
      updatePasswordMock,
      userEntityMock.id,
    );
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in update password', async () => {
    expect(
      service.updatePasswordUser(invalidUpdatePasswordMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error in user not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updatePasswordUser(updatePasswordMock, userEntityMock.id),
    ).rejects.toThrow();
  });
});
