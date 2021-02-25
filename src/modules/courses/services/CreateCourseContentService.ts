import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'
import CourseContent from '@modules/courses/infra/typeorm/entities/CourseContent'

import AppError from '@shared/errors/AppError'

import ICourseContentRepository from '../repositories/ICourseContentRepository'
import ICoursesRepository from '../repositories/ICoursesRepository'
import ICreateContentCourseDTO from '../dtos/ICreateContentCourseDTO'

@injectable()
class CreateCourseContentService {

  constructor(
    @inject('CourseContentRepository')
    private courseContentRepository: ICourseContentRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository
    ) {
  }

  public async execute({ courseId, description, title, video }: ICreateContentCourseDTO): Promise<CourseContent> {
    const findCourse = await this.coursesRepository.findById(courseId);

    if(!findCourse) {
      throw new AppError('You cant create content to a inexistent course');
    }

    const courseContent = await this.courseContentRepository.create({ courseId, description, title, video})

    return courseContent
  }
}

export default CreateCourseContentService;
