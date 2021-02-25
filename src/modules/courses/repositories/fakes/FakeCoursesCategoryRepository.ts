import { uuid } from 'uuidv4'

import CoursesCategory from '@modules/courses/infra/typeorm/entities/CoursesCategory'

import ICoursesCategoryRepository from '@modules/courses/repositories/ICoursesCategoryRepository'

class FakeCoursesCategoryRepository implements ICoursesCategoryRepository {
  private categories: CoursesCategory[] = [];

  public async create(name: string): Promise<CoursesCategory> {
    const category = new CoursesCategory();

    Object.assign(category, { id: uuid(), name })

    await this.categories.push(category);

    return category
  }
}

export default FakeCoursesCategoryRepository;
