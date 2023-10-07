import { UserEntity } from '../src/user/entities/user.entity';
import { UserType } from '../src/user/enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '',
  createdAt: new Date(),
  email: 'johndoe@teste.com',
  id: 1212,
  name: 'nameMock',
  password: '$2b$10$YFSV7tbfBlzD29P/yT5dM.on7icw8r4OdXgcMJiUqr4/pVNUGQCPi',
  phone: '11999999999',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
