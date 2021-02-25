import { getRepository, Repository, Not } from 'typeorm';

import CourseContent from '../entities/CourseContent'

import ICreateContentCourseDTO from '@modules/courses/dtos/ICreateContentCourseDTO'
import ICourseContentRepository from '@modules/courses/repositories/ICourseContentRepository'

class CourseContentRepository implements ICourseContentRepository {
  private ormRepository: Repository<CourseContent>

  constructor() {
    this.ormRepository = getRepository(CourseContent)
  }

  public async create({ courseId, description, title, video }: ICreateContentCourseDTO):Promise<CourseContent> {
    const courseContent = await this.ormRepository.create({ courseId, title, description, video });

    await this.ormRepository.save(courseContent);

    return courseContent;
  }

}

export default CourseContentRepository;
