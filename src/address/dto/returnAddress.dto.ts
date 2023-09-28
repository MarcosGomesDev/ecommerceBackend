import { ReturnCityDto } from '../city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    (this.complement = address.complement),
      (this.cep = address.cep),
      (this.numberAddress = address.numberAddress);
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
