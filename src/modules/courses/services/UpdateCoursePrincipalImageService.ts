import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'
import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

@injectable()
class UpdateCoursePrincipalImageService {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICourseRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider) {
  }

  public async execute(id: string, newPrincipalImage: string): Promise<Course> {
    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError('This course does not exist')
    }

    if (course.principalImage) {
      await this.storageProvider.deleteFile(course.principalImage)
    }

    const fileName = await this.storageProvider.saveFile(newPrincipalImage);

    course.principalImage = fileName;

    await this.coursesRepository.save(course)

    return course
  }
}

export default UpdateCoursePrincipalImageService;
