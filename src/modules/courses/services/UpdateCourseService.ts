import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'

import Course from '@modules/courses/infra/typeorm/entities/Course'
import AppError from '@shared/errors/AppError'

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface Request {
  name?: string;
  description?: string;
  courseId: string;
  category?: string;
  tags?: string;
  newPrincipalImage?: string | null;
}
@injectable()
class UpdateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
    ) {
  }

  public async execute({ courseId, name, description, category, tags, newPrincipalImage }: Request): Promise<Course>{
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new AppError('This course does not exist!')
    }

    name ? course.name = name : course.name;

    description ? course.description = description : course.description;

    category ? course.category = category : course.category;

    tags ? course.tags = tags : course.tags;

    if(newPrincipalImage) {
      if(course.principalImage) {
        await this.storageProvider.deleteFile(course.principalImage)
      }

      await this.storageProvider.saveFile(newPrincipalImage);
      course.principalImage = newPrincipalImage;
    }

    return await this.coursesRepository.save(course)
  }
}

export default UpdateCourseService
