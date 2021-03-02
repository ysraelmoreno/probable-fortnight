import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import CategoryController from '@modules/courses/infra/http/controller/CategoryController'

const categoryRoutes = Router();

categoryRoutes.use(ensureAuthenticated)

const categoryController = new CategoryController();

categoryRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
  }
}), categoryController.create)

export default categoryRoutes;
