import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IFindByEmailDTO from '../dtos/IFindByEmailDTO'
import IFindByIdDTO from '../dtos/IFindByIdDTO'

export default interface IUsersRepository {
  findById(data: IFindByIdDTO): Promise<User | undefined>;
  findByEmail(data: IFindByEmailDTO): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
