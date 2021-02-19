import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    ) {
  }

  public async execute(userId: string): Promise<User>{
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new AppError('Cannot change information of non-existing user')
    }

    return user;
  }
}

export default ShowProfileService
