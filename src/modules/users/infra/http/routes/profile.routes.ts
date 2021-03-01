import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileRouter = Router();
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email(),
  }
}), profileController.update)
profileRouter.get('/', profileController.show)

export default profileRouter;
