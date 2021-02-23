import { injectable ,inject } from 'tsyringe'

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository'
import Course from '../infra/typeorm/entities/Course'

@injectable()
class ListOwnCoursesService {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository) {
  }

  public async execute(id: string): Promise<Course[]> {
    return await this.coursesRepository.list(id);
  }
}

export default ListOwnCoursesService;
