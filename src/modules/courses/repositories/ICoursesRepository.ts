import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO'
import IFindCourseByNameAndTeacherDTO from '@modules/courses/dtos/IFindCourseByNameAndTeacherDTO'


export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  list(id: string): Promise<Course[]>;
  findByIdAndName(data: IFindCourseByNameAndTeacherDTO): Promise<Course | undefined>;
  findById(id: string): Promise<Course | undefined>;
  save(course: Course): Promise<Course>;

  // findByTags(data: string[]): Promise<Course[] | undefined>;
}
