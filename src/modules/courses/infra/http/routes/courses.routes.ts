import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CourseController from '@modules/courses/infra/http/controller/CourseController'

const coursesRoutes = Router();

coursesRoutes.use(ensureAuthenticated)

const courseController = new CourseController();
const upload = multer(uploadConfig);

coursesRoutes.get('/', courseController.index)
coursesRoutes.get('/mycourses', courseController.show)

coursesRoutes.post('/', upload.single('principalImage'), courseController.create)
coursesRoutes.put('/', upload.single('newPrincipalImage'), courseController.update)

export default coursesRoutes;
