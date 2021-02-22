import { injectable ,inject } from 'tsyringe'

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository'
import Course from '../infra/typeorm/entities/Course'

@injectable()
class ListAllCoursesServices {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository) {
  }

  public async execute(id: string): Promise<Course[]> {
    const courses = await this.coursesRepository.list(id);

    return courses;
  }
}

export default ListAllCoursesServices;
