import { uuid } from 'uuidv4'
import Course from '@modules/courses/infra/typeorm/entities/Course'

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO'
import IFindCourseByNameAndTeacherDTO from '@modules/courses/dtos/IFindCourseByNameAndTeacherDTO'
import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import IListAllCoursesDTO from '@modules/courses/dtos/IListAllCoursesDTO'

class CoursesRepository implements ICourseRepository {
  private courses: Course[] = [];

  public async findByIdAndName({ name, teacherId }: IFindCourseByNameAndTeacherDTO): Promise<Course | undefined> {
    const findCourse = this.courses.find(course =>
      course.teacherId === teacherId && course.name === name
    )

    return findCourse
  }

  public async list({ id }: IListAllCoursesDTO): Promise<Course[]> {
    const courses = await this.courses.filter(course => course.teacherId === id)

    return courses
  }

  public async create({ name, description, teacherId }: ICreateCourseDTO): Promise<Course> {
    const course = new Course();

    Object.assign(course, { id: uuid(), name, description, teacherId })

    this.courses.push(course);

    return course
  }
}

export default CoursesRepository;
