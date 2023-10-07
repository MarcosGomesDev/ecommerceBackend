import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { StateService } from '../src/state/state.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateEntity } from '../src/state/entities/state.entity';
import { stateMock } from '../mocks/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateMock]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return list of states', async () => {
    const states = await service.getAllState();

    expect(states).toEqual([stateMock]);
  });

  it('should return error in exception', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
    expect(service.getAllState()).rejects.toThrowError();
  });
});
