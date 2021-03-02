import { injectable ,inject } from 'tsyringe'

import ICourseContentRepository from '@modules/courses/repositories/ICourseContentRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import CourseContent from '../infra/typeorm/entities/CourseContent'
import AppError from '@shared/errors/AppError';

@injectable()
class ShowCourseContentService {

  constructor(
    @inject('CourseContentRepository')
    private courseContent: ICourseContentRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
    ) {
  }

  public async execute(courseId: string): Promise<CourseContent[]> {
    let course = await this.cacheProvider.recover<CourseContent[]>(`course-content:${courseId}`)

    if(!course) {
      course = await this.courseContent.listContent(courseId);

      if(!course) {
        throw new AppError('This course dont have any content')
      }
      await this.cacheProvider.save(`course-content:${courseId}`, course)
    }
    return course;
  }
}

export default ShowCourseContentService;
