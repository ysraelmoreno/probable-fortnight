import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'
import path from 'path'

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
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User is not registered", 401);
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[One Learning]Pedido de recuperação de senha',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/resetpassword?token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordService;
