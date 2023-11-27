import { UserEntity } from '../src/user/entities/user.entity';
import { UserType } from '../src/user/enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '',
  createdAt: new Date(),
  email: 'johndoe@teste.com',
  id: 1212,
  name: 'nameMock',
  password: '$2b$10$cTVmSOZ8DJ8HFy7LO8PrYefNy7VpuIfl7uIl/l0.RuxzPGWtX0gjC',
  phone: '11999999999',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
