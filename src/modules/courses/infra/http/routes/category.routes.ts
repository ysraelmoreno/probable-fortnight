import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import CategoryController from '@modules/courses/infra/http/controller/CategoryController'

const categoryRoutes = Router();

categoryRoutes.use(ensureAuthenticated)

const categoryController = new CategoryController();

categoryRoutes.post('/category', categoryController.create)

export default categoryRoutes;
