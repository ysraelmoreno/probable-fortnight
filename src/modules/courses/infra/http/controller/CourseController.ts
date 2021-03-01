import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateCourseService from '@modules/courses/services/CreateCourseService'
import ListAllCoursesService from '@modules/courses/services/ListAllCoursesService'
import ListOwnCoursesService from '@modules/courses/services/ListOwnCoursesService'
import UpdateCourseService from '@modules/courses/services/UpdateCourseService'

export default class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListAllCoursesService)
    const courses = await listCourses.execute();

    return response.json(classToClass(courses))

  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListOwnCoursesService)
    const courses = await listCourses.execute(request.user.id);

    return response.json(classToClass(courses))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCourse = container.resolve(UpdateCourseService);
    const courseId = request.params.id;
    const { name, description, category, tags } = request.body;

    let newPrincipalImage;

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

    return response.json(classToClass(course))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, category, tags } = request.body;

    let principalImage = undefined;
    const teacherId = request.user.id;

    if(request.file) {
      principalImage = request.file.filename;
    }

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ name, description, teacherId, category, tags, principalImage })

    return response.json(classToClass(course));

  }

}
