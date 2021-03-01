import { injectable ,inject } from 'tsyringe'

import ICourseContentRepository from '@modules/courses/repositories/ICourseContentRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import CourseContent from '../infra/typeorm/entities/CourseContent'
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllCoursesServices {

  constructor(
    @inject('CourseContentRepository')
    private courseContent: ICourseContentRepository,

    ) {
  }

  public async execute(courseId: string): Promise<CourseContent> {
    const findCourse = await this.courseContent.listContent(courseId);

    if(!findCourse) {
      throw new AppError('This course dont have any content')
    }

    return findCourse;
  }
}

export default ListAllCoursesServices;
