import CourseContent from '@modules/courses/infra/typeorm/entities/CourseContent'

import ICreateContentCourseDTO from '@modules/courses/dtos/ICreateContentCourseDTO'


export default interface ICourseContentRepository {
  create(data: ICreateContentCourseDTO): Promise<CourseContent>;
  listContent(courseId: string): Promise<CourseContent[] | undefined>
}
