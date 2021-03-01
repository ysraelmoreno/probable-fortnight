import { injectable ,inject } from 'tsyringe'

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository'
import Course from '../infra/typeorm/entities/Course'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

@injectable()
class ListAllCoursesServices {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
    ) {
  }

  public async execute(id?: string): Promise<Course[]> {
    let courses = await this.cacheProvider.recover<Course[]>(`courses-list:${id}`)

    if(!courses) {
      courses = await this.coursesRepository.listAllCourses(id);
      await this.cacheProvider.save(`courses-list:${id}`, courses)

      console.log('A query no banco foi feita')
    }

    return courses
  }
}

export default ListAllCoursesServices;
