import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'

// import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
    ) {
  }

  public async execute({ email }: Request): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail({ email })

    if (!checkUserExists) {
      throw new AppError("User is not registered", 401);
    }
    await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}

export default SendForgotPasswordService;
