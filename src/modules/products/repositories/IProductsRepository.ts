import Product from "../infra/typeorm/entities/Product";

import ICreateProductDTO from '../dtos/ICreateProductsDTO'

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  save(product: Product): Promise<Product>
}
