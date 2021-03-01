import { Router } from 'express'
import multer from 'multer'
import { celebrate, Segments, Joi} from 'celebrate'

import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import UserController from '@modules/users/infra/http/controllers/UserController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router();
const usersController = new UserController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig);

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create)

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)
export default usersRouter;
