import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError';

import SendForgotPasswordService from './SendForgotPasswordService'

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPassword = new SendForgotPasswordService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository)
  })

  it('should be able to recover the password using the email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    await fakeUsersRepository.create({ name, email, password })

    const user = await sendForgotPassword.execute({
      email
    })

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await expect(sendForgotPassword.execute({
      email: 'jonathandoe@example.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password })

    await sendForgotPassword.execute({
      email
    })

    expect(generateToken).toHaveBeenCalledWith(user.id);
  })
});
