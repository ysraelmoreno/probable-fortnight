import { Request, Response} from 'express'
import { container } from 'tsyringe'

import CreateProductService from '@modules/products/services/CreateProductService'
import UpdateProductService from '@modules/products/services/UpdateProductService'
export default class ProductsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { productId, name, description, type, principalImage } = request.body;

    const updateProduct = container.resolve(UpdateProductService)

    const product = await updateProduct.execute({ productId, name, description, type, principalImage })
    return response.json(product)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, type, principalImage } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({ name, description, type, principalImage })

    return response.json(product);

  }

}
