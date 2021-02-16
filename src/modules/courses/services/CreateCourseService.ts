import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'
import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import AppError from '@shared/errors/AppError'

interface Request {
  name: string;
  description: string;
  teacherId: string;
}
@injectable()
class CreateCourseService {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICourseRepository) {
  }

  public async execute({ name, description, teacherId }: Request): Promise<Course> {
    const findCourse = await this.coursesRepository.findByIdAndName({ name, teacherId});

    if (findCourse) {
      throw new AppError("You already has this course registered", 401);
    }

    const course = await this.coursesRepository.create({ name, description, teacherId})

    return course;
  }
}

export default CreateCourseService;
