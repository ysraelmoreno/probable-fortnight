import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindByIdDTO from '@modules/users/dtos/IFindByIdDTO'
import IFindByEmailDTO from '@modules/users/dtos/IFindByEmailDTO'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findByEmail({ email }: IFindByEmailDTO): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email }
    });

    return findUser;
  }

  public async findById({ id }: IFindByIdDTO): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id }
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
