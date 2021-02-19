import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {
  }

  public async execute({ name, email, password }: Request): Promise<User> {

    const findUser = await this.usersRepository.findByEmail(email);

    if(findUser) {
      throw new AppError("User already registered", 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({ name, email, password: hashedPassword })

    return user;
  }
}

export default CreateUserService;
