import { CreateAddressDto } from '../src/address/dto/createAddress.dto';
import { addressMock } from './address.mock';
import { cityMock } from './city.mock';

export const createAddressMock: CreateAddressDto = {
  cep: addressMock.cep,
  cityId: cityMock.id,
  numberAddress: addressMock.numberAddress,
  complement: addressMock.complement,
};
