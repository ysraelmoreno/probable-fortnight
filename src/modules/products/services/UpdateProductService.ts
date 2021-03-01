import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IProductsRepository from '@modules/products/repositories/IProductsRepository'
import IUpdateProductDTO from '../dtos/IUpdateProductDTO'
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError'

@injectable()
class UpdateProductService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    ) {
  }

  public async execute({ productId, name, description, type, principalImage }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(productId);

    if(!product) {
      throw new AppError('Product not found')
    }

    let newType;

    if(type === "digital" || type === "physical") {
      newType = type;
    } else {
      throw new AppError('Type must be Digital or Physical')
    }

    name ? product.name = name : product.name;
    description ? product.description = description : product.description;
    type ? product.type = newType : product.type;
    principalImage ? product.principalImage = principalImage : product.principalImage;

    return await this.productsRepository.save(product)
  }
}

export default UpdateProductService;
