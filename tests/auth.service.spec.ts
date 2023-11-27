import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../src/auth/auth.service';
import { UserService } from '../src/user/user.service';
import { userEntityMock } from '../mocks/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../mocks/jwt.mock';
import { loginUserMock } from '../mocks/loginUser.mock';
import { ReturnUserDto } from '../src/user/dtos/returnUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginUserMock);
    expect(user).toEqual({
      access_token: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginUserMock, password: 'abc' }),
    ).rejects.toThrow();
  });

  it('should return user if email not exists', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrow();
  });

  it('should return error in userService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrow();
  });
});
