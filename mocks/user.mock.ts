import { UserEntity } from '../src/user/entities/user.entity';
import { UserType } from '../src/user/enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '',
  createdAt: new Date(),
  email: 'margarido@teste.com',
  id: 1212,
  name: 'nameMock',
  password: '123',
  phone: '11999999999',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
