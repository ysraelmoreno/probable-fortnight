import { Router } from 'express'
import multer from 'multer'

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

coursesRoutes.post('/content', upload.single('video'), courseContentController.create)
coursesRoutes.post('/', upload.single('principalImage'), courseController.create)
coursesRoutes.put('/', upload.single('newPrincipalImage'), courseController.update)
export default coursesRoutes;
