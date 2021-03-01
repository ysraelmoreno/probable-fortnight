import { Request, Response} from 'express'
import { container } from 'tsyringe'

import ShowCourseContentService from '@modules/courses/services/ShowCourseContentService'
import CreateCourseContentService from '@modules/courses/services/CreateCourseContentService'

export default class CourseContentController {
  public async show(request: Request, response: Response): Promise<Response> {
    const courseId = request.params.id;

    const findCourseContent = container.resolve(ShowCourseContentService);

    const courseContent = await findCourseContent.execute(courseId)

    return response.json(courseContent);

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const courseId = request.params.id;
    const { title, description, video } = request.body;

    const createCourseContent = container.resolve(CreateCourseContentService);

    const courseContent = await createCourseContent.execute({ title, courseId, description, video })

    return response.json(courseContent);

  }

}
