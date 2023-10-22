import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async createProduct(createProduct: CreateProduct): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);

    return this.productRepository.save({ ...createProduct });
  }
}
