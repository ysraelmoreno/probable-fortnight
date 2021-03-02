import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AffiliateController from '@modules/courses/infra/http/controller/AffiliateController'

const affiliatesRoutes = Router();
const affiliateController = new AffiliateController()

affiliatesRoutes.use(ensureAuthenticated)

affiliatesRoutes.get('/:courseId', affiliateController.show)

affiliatesRoutes.post('/:courseId',  affiliateController.create)

export default affiliatesRoutes;
