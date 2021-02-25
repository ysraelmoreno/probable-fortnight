import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICoursesCategoryRepository from '../repositories/ICoursesCategoryRepository'
import CoursesCategory from '../infra/typeorm/entities/CoursesCategory'

@injectable()
class CreateCategoryService {

  constructor(
    @inject('CoursesCategoryRepository')
    private categoryRepository: ICoursesCategoryRepository,
    ) {
  }

  public async execute(name: string): Promise<CoursesCategory> {
    const category = await this.categoryRepository.create(name);

    return category
  }
}

export default CreateCategoryService;
