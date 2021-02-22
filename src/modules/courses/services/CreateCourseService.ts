import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'
import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO'

@injectable()
class CreateCourseService {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICourseRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider) {
  }

  public async execute({ name, description, teacherId, category, tags, principalImage }: ICreateCourseDTO): Promise<Course> {
    if (principalImage){
      const fileName = await this.storageProvider.saveFile(principalImage)
    }
    const course = await this.coursesRepository.create({ name, description, teacherId, category, tags, principalImage })

    return course;
  }
}

export default CreateCourseService;
