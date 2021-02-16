import { uuid } from 'uuidv4'
import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindByIdDTO from '@modules/users/dtos/IFindByIdDTO'
import IFindByEmailDTO from '@modules/users/dtos/IFindByEmailDTO'

class UsersRepository implements IUsersRepository {
  private users: User[] = [];


  public async findByEmail({ email }: IFindByEmailDTO): Promise<User | undefined> {
    const userByEmail = await this.users.find(user => user.email === email);

    return userByEmail;
  }

  public async findById({ id }: IFindByIdDTO): Promise<User | undefined> {
    const userById = await this.users.find(user => user.id === id);

    return userById;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    await this.users.push(user)

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = await this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user
  }
}

export default UsersRepository;
