import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '@app/address/address.service';
import { AddressEntity } from '@app/address/entities/address.entity';
import { UserService } from '@app/user/user.service';
import { CityService } from '@app/city/city.service';
import { userEntityMock } from '@mocks/user.mock';
import { cityMock } from '@mocks/city.mock';
import { addressMock } from '@mocks/address.mock';
import { createAddressMock } from '@mocks/createAddressDTO.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAddress(
      createAddressMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressMock);
  });

  it('should return error exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return all addresses to user', async () => {
    const addresses = await service.findAddressesByUserId(userEntityMock.id);

    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found if not address register', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(
      service.findAddressesByUserId(userEntityMock.id),
    ).rejects.toThrowError();
  });
});
