import CourseContent from '@modules/courses/infra/typeorm/entities/CourseContent'
import CoursesCategory from '../infra/typeorm/entities/CoursesCategory';

export default interface ICoursesCategoryRepository {
  create(name: string): Promise<CoursesCategory>;

}
