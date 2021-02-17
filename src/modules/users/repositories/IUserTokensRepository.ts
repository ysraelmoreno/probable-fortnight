import UserToken from '../infra/typeorm/entities/UserToken'
import ICreateUserTokensDTO from '@modules/users/dtos/ICreateUserTokensDTO'

export default interface IUserTokensRepository {
  generate(data: ICreateUserTokensDTO): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
