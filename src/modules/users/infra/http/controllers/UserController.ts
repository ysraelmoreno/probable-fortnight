import { Request, Response} from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'
import ListAllUsersService from '@modules/users/services/ListAllUsersService'

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({ name, email, password })

    delete user.password

    return response.json(user)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListAllUsersService)

    const users = await listUsers.execute();

    users.forEach(user => delete user.password);

    return response.json(users)
  }


}
