import CoursesCategory from '../infra/typeorm/entities/CoursesCategory';

export default interface ICoursesCategoryRepository {
  create(name: string): Promise<CoursesCategory>;
  find(id: string): Promise<CoursesCategory | undefined>
  findByName(name: string): Promise<CoursesCategory | undefined>
}
