import { Request, Response} from 'express'
import { container } from 'tsyringe'

import CreateCategoryService from '@modules/courses/services/CreateCategoryService'


export default class CourseContentController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute(name)

    return response.json(category);

  }

}
