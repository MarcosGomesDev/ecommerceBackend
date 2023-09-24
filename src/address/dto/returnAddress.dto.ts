import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;

  constructor(address: AddressEntity) {
    (this.complement = address.complement),
      (this.cep = address.cep),
      (this.numberAddress = address.numberAddress);
  }
}
