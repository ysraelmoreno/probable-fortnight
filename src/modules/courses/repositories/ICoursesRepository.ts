import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO'
import IFindCourseByNameAndTeacherDTO from '@modules/courses/dtos/IFindCourseByNameAndTeacherDTO'
import IListAllCoursesDTO from '@modules/courses/dtos/IListAllCoursesDTO'

export default interface IUsersRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  list(data: IListAllCoursesDTO): Promise<Course[]>
  findByIdAndName(data: IFindCourseByNameAndTeacherDTO): Promise<Course | undefined>
}
