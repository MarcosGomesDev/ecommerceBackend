import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../src/product/product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../src/product/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../mocks/product.mock';
import { CategoryService } from '../src/category/category.service';
import { categoryMock } from '../mocks/category.mock';
import { createProduct } from '../mocks/createProduct.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should create a product', async () => {
    const product = await service.createProduct(createProduct);
    expect(product).toEqual(createProduct);
  });

  it('should return error if category not found', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProduct)).rejects.toThrowError();
  });
});
