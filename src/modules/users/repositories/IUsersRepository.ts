import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUsersRepository {
  findById(userId: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  list(): Promise<User[]>;
}
