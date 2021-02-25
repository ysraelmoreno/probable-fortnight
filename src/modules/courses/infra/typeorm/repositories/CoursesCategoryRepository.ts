import { getRepository, Repository } from 'typeorm';

import CoursesCategory from '../entities/CoursesCategory'
import ICoursesCategoryRepository from '../../../repositories/ICoursesCategoryRepository'
import ICreateCoursesCategoryDTO from '@modules/courses/dtos/ICreateCoursesCategoryDTO'

class CoursesCategoryRepository implements ICoursesCategoryRepository {
  private ormRepository: Repository<CoursesCategory>

  constructor() {
    this.ormRepository = getRepository(CoursesCategory)
  }

  public async find(id: string): Promise<CoursesCategory | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async findByName(name: string): Promise<CoursesCategory | undefined> {
    return await this.ormRepository.findOne({
      where: { name  }
    });
  }

  public async create(name: string): Promise<CoursesCategory> {

    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category)

    return category;
  }
}

export default CoursesCategoryRepository;
