import { stateMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  id: 12,
  name: 'citymock',
  stateId: stateMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
