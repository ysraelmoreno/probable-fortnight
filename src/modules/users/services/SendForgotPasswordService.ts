import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
    ) {
  }

  public async execute({ email }: Request): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail({ email })

    if (!checkUserExists) {
      throw new AppError("User is not registered", 401);
    }

    const { token } = await this.userTokensRepository.generate(checkUserExists.id)

    await this.mailProvider.sendMail(email, `Pedido de recuperação recebido ${token}`)
  }
}

export default SendForgotPasswordService;
