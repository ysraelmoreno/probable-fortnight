import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User, 'default')
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email }
    });

    return findUser;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id: userId }
    });

    return findUser;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user)

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

}

export default UsersRepository;
