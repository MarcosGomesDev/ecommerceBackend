import { PartialType } from '@nestjs/mapped-types';
import { CreateProduct } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProduct) {}
