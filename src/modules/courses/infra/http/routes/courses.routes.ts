import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CourseController from '@modules/courses/infra/http/controller/CourseController'

const coursesRoutes = Router();

coursesRoutes.use(ensureAuthenticated)

const courseController = new CourseController();

coursesRoutes.get('/', courseController.index)

coursesRoutes.post('/', courseController.create)

export default coursesRoutes;
