import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface Request {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    ) {
  }

  public async execute({ userId, name, email, password, oldPassword }: Request): Promise<User>{
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new AppError('Cannot change information of non-existing user')
    }

    const findEmail = await this.usersRepository.findByEmail(email)

    if (findEmail && findEmail.id !== user.id) {
      throw new AppError('Email already used')
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new AppError('You need to inform the old password to set a new password to your profile')
    }

    if (password && oldPassword) {
      const compareHash = await this.hashProvider.compareHash(oldPassword, user.password)

      if (!compareHash) {
        throw new AppError('Old password not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }


    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService
