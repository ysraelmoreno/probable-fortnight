import { getRepository, Repository } from 'typeorm';

import Product from '../entities/Product'

import IProductsRepository from '../../../repositories/IProductsRepository'
import ICreateProductDTO from '@modules/products/dtos/ICreateProductsDTO';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = getRepository(Product)
  }

  public async save(product: Product): Promise<Product> {
    return await this.ormRepository.save(product)
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id)

    return product
  }

  public async create({ name, description, type, principalImage }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, description, type, principalImage });

    await this.ormRepository.save(product);

    return product
  }
}

export default ProductsRepository;
