import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService'
import SendForgotPasswordService from './SendForgotPasswordService'


describe('SendForgotPassword', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider()
    const sendForgotPassword = new SendForgotPasswordService(fakeUsersRepository, fakeMailProvider)

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider()
    const sendForgotPassword = new SendForgotPasswordService(fakeUsersRepository, fakeMailProvider)

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await expect(sendForgotPassword.execute({
      email: 'jonathandoe@example.com'
    })).rejects.toBeInstanceOf(AppError);
  })
});
