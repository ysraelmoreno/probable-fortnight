import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import SessionController from '@modules/users/infra/http/controllers/SessionController'

const sessionsRouter = Router();

const sessionController = new SessionController();

sessionsRouter.post('/', sessionController.create)

export default sessionsRouter;
