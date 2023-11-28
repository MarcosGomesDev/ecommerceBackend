import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '@app/product/product.service';
import { ProductEntity } from '@app/product/entities/product.entity';
import { CategoryService } from '@app/category/category.service';
import { categoryMock } from '@mocks/category.mock';
import { productMock } from '@mocks/product.mock';
import { returnDelete } from '@mocks/returnDelete.mock';
import { createProduct } from '@mocks/createProduct.mock';

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
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDelete),
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

    expect(service.findAll()).rejects.toThrow();
  });

  it('should create a product', async () => {
    const product = await service.createProduct(createProduct);
    expect(product).toEqual(productMock);
  });

  it('should return error if category not found', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProduct)).rejects.toThrow();
  });

  it('should return product by id', async () => {
    const product = await service.findProductById(productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should return error if product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findProductById(1)).rejects.toThrow();
  });

  it('should delete product in find by id', async () => {
    const product = await service.deleteProduct(productMock.id);
    expect(product).toEqual(returnDelete);
  });

  it('should return error if product not found', async () => {
    jest.spyOn(productRepository, 'delete').mockRejectedValue(new Error());

    expect(service.deleteProduct(productMock.id)).rejects.toThrow();
  });

  it('should return deleted true in delete product', async () => {
    const product = await service.deleteProduct(productMock.id);
    expect(product).toEqual(returnDelete);
  });

  it('should return product after update', async () => {
    const product = await service.updateProduct(createProduct, productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(createProduct, productMock.id),
    ).rejects.toThrow();
  });
});
