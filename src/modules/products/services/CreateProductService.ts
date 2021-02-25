import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'

import IProductsRepository from '@modules/products/repositories/IProductsRepository'
import ICreateProductDTO from '../dtos/ICreateProductsDTO'
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError'

@injectable()
class CreateProductService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    ) {
  }

  public async execute({ name, description, type, principalImage }: ICreateProductDTO): Promise<Product> {
    let newType;

    if(type === "digital" || type === "physical") {
      newType = type;
    } else {
      throw new AppError('Type must be Digital or Physical')
    }

    const product = await this.productsRepository.create({ name, description, type: newType, principalImage })

    return product
  }
}

export default CreateProductService;
