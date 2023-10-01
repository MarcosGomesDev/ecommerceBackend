import { stateMock } from './state.mock';
import { CityEntity } from '../src/city/entities/city.entity';

export const cityMock: CityEntity = {
  id: 12,
  name: 'citymock',
  stateId: stateMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
