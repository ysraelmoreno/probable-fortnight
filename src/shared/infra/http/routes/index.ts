import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import coursesRouter from '@modules/courses/infra/http/routes/courses.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'


const routes = Router();

routes.use('/users', usersRouter)
routes.use('/courses', coursesRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

export default routes;
