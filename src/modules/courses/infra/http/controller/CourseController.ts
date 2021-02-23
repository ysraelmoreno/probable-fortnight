import { Request, Response} from 'express'
import { container } from 'tsyringe'

import CreateCourseService from '@modules/courses/services/CreateCourseService'
import ListAllCoursesService from '@modules/courses/services/ListAllCoursesService'
import ListOwnCoursesService from '@modules/courses/services/ListOwnCoursesService'
import UpdateCourseService from '@modules/courses/services/UpdateCourseService'

export default class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListAllCoursesService)
    const courses = await listCourses.execute();

    return response.json(courses)

  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListOwnCoursesService)
    const courses = await listCourses.execute(request.user.id);

    return response.json(courses)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCourse = container.resolve(UpdateCourseService)
    const { courseId, name, description, category, tags } = request.body;

    let newPrincipalImage

    if(request.file) {
      newPrincipalImage = request.file.filename;
    }

    const course = await updateCourse.execute({
      courseId,
      name,
      description,
      category,
      tags,
      newPrincipalImage
    })

    return response.json(course)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, category, tags } = request.body;

    let principalImage = null;
    const teacherId = request.user.id;

    if(request.file) {
      principalImage = request.file.filename;
    }

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ name, description, teacherId, category, tags, principalImage })

    return response.json(course);

  }

}
