import { hash } from 'bcryptjs'
import { injectable ,inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class ListAllUsersService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {
  }

  public async execute(): Promise<User[]> {

    const users = await this.usersRepository.list();

    return users;
  }
}

export default ListAllUsersService;
