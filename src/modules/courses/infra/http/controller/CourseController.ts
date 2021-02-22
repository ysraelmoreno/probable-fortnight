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
    const { name, description, category, tags } = request.body;

    const teacherId = request.user.id
    const principalImage = request.file.filename;

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ name, description, teacherId, category, tags, principalImage })

    return response.json(course);

  }

}
