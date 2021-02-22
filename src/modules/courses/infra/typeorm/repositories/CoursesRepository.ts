import { getRepository, Repository } from 'typeorm';

import Course from '../entities/Course'

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO'
import IFindCourseByNameAndTeacherDTO from '@modules/courses/dtos/IFindCourseByNameAndTeacherDTO'
import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import IListAllCoursesDTO from '@modules/courses/dtos/IListAllCoursesDTO'

class CoursesRepository implements ICourseRepository {
  private ormRepository: Repository<Course>

  constructor() {
    this.ormRepository = getRepository(Course)
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id);

    return course;
  }

  public async findByIdAndName({ name, teacherId }: IFindCourseByNameAndTeacherDTO): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: [
        { name: name },
        { teacher: teacherId}
      ]
    });

    return course;
  }

  public async list({ id }: IListAllCoursesDTO): Promise<Course[]> {
    const courses = await this.ormRepository.find({ teacherId: id });
    return courses

  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course)
  }

  public async create({ name, description, teacherId, category, tags }: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create({ name, description, teacherId, category, tags });

    await this.ormRepository.save(course)

    return course;
  }
}

export default CoursesRepository;
