import { injectable ,inject } from 'tsyringe'

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository'
import Course from '../infra/typeorm/entities/Course'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

@injectable()
class ListOwnCoursesService {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider) {
  }

  public async execute(id: string): Promise<Course[]> {
    let courses = await this.cacheProvider.recover<Course[]>(`courses-list:${id}`)

    if(!courses) {
      courses = await this.coursesRepository.list(id);

      await this.cacheProvider.save(`courses-list:${id}`, courses)
    }

    return courses
  }
}

export default ListOwnCoursesService;
