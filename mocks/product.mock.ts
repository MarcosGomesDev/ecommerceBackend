import { ProductEntity } from 'src/product/entities/product.entity';
import { categoryMock } from './category.mock';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 7432,
  image: 'http://image.com',
  name: 'Product Name',
  price: 100,
  updatedAt: new Date(),
};
