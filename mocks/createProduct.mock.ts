import { CreateProduct } from 'src/product/dto/create-product.dto';
import { categoryMock } from './category.mock';

export const createProduct: CreateProduct = {
  name: 'Product',
  price: 10,
  categoryId: categoryMock.id,
  image: 'image',
};
