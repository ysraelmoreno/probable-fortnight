import { Request, Response} from 'express'
import { container } from 'tsyringe'

import CreateCourseContentService from '@modules/courses/services/CreateCourseContentService'


export default class CourseContentController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { courseId, title, description, video } = request.body;

    const createCourseContent = container.resolve(CreateCourseContentService);

    const courseContent = await createCourseContent.execute({ title, courseId, description, video })

    return response.json(courseContent);

  }

}
