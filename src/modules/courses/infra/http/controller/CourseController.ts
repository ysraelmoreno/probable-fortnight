import { Request, Response} from 'express'
import { container } from 'tsyringe'

import CreateCourseService from '@modules/courses/services/CreateCourseService'
import ListAllCoursesService from '@modules/courses/services/ListAllCoursesService'

export default class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListAllCoursesService)
    const courses = await listCourses.execute({ id: request.user.id  });

    return response.json(courses)

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, teacherId } = request.body;

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ name, description, teacherId })

    return response.json(course);

  }

}
