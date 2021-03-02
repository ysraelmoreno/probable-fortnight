import { Request, Response} from 'express'
import { container } from 'tsyringe'

import ShowCoursesAffiliatesService from '@modules/courses/services/ShowCoursesAffiliatesService'
import SignAffiliateToACourse from '@modules/courses/services/SignAffiliateToACourse';

export default class AffiliateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { courseId } = request.params;

    const showCoursesAffiliates = container.resolve(ShowCoursesAffiliatesService)

    const findAffiliates = await showCoursesAffiliates.execute(courseId)

    return response.json(findAffiliates);

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { courseId } = request.params;
    const userId = request.user.id;

    const signAffiliate = container.resolve(SignAffiliateToACourse);

    const affiliate = await signAffiliate.execute(courseId, userId);

    return response.json(affiliate);

  }

}
