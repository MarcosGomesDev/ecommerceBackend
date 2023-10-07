import { LoginDto } from '../src/auth/dtos/login.dto';
import { userEntityMock } from './user.mock';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '1234',
};
