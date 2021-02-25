import 'reflect-metadata'
import { injectable ,inject } from 'tsyringe'
import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import ICoursesCategoryRepository from '@modules/courses/repositories/ICoursesCategoryRepository'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO'

@injectable()
class CreateCourseService {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICourseRepository,

    @inject('CoursesCategoryRepository')
    private coursesCategoryRepository: ICoursesCategoryRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
    ) {
  }

  public async execute({ name, description, teacherId, category, tags, principalImage }: ICreateCourseDTO): Promise<Course> {
    const findCategory = await this.coursesCategoryRepository.find(category)

    if(!findCategory) {
      throw new AppError('Category not found')
    }

    const course = await this.coursesRepository.create({ name, description, teacherId, category, tags, principalImage })

    if (principalImage){
      const fileName = await this.storageProvider.saveFile(principalImage)
      course.principalImage = fileName;
    }

    await this.coursesRepository.save(course)

    return course;
  }
}

export default CreateCourseService;
