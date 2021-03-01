import { Router } from 'express'
import multer from 'multer'
import { celebrate, Segments, Joi } from 'celebrate'

import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CourseController from '@modules/courses/infra/http/controller/CourseController'
import CourseContentController from '@modules/courses/infra/http/controller/CourseContentController'
import categoryRoutes from './category.routes'

const coursesRoutes = Router();

coursesRoutes.use(ensureAuthenticated)

const courseContentController = new CourseContentController();
const courseController = new CourseController();
const upload = multer(uploadConfig);
coursesRoutes.use(categoryRoutes)

coursesRoutes.get('/', courseController.index)
coursesRoutes.get('/mycourses', courseController.show)

coursesRoutes.get('/:id/content', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), courseContentController.show)

coursesRoutes.post('/:id/content', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  },
  [Segments.BODY]: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    video: Joi.string().required()
  }
}), upload.single('video'), courseContentController.create)

coursesRoutes.post('/', upload.single('principalImage'), courseController.create)

coursesRoutes.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), upload.single('newPrincipalImage'), courseController.update)

export default coursesRoutes;
