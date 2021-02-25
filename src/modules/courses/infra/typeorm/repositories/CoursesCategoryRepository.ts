import { getRepository, Repository, Not } from 'typeorm';

import CoursesCategory from '../entities/CoursesCategory'
import ICoursesCategoryRepository from '../../../repositories/ICoursesCategoryRepository'

class CoursesCategoryRepository implements ICoursesCategoryRepository {
  private ormRepository: Repository<CoursesCategory>

  constructor() {
    this.ormRepository = getRepository(CoursesCategory)
  }

  public async create(name: string): Promise<CoursesCategory> {

    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category)

    return category;
  }
}

export default CoursesCategoryRepository;
