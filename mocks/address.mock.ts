import { AddressEntity } from '../src/address/entities/address.entity';
import { cityMock } from './city.mock';
import { userEntityMock } from './user.mock';

export const addressMock: AddressEntity = {
  cep: '11340290',
  id: 1212,
  cityId: cityMock.id,
  complement: '',
  createdAt: new Date(),
  numberAddress: 89,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
