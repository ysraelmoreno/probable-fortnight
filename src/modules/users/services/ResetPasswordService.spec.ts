import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import ResetPasswordService from './ResetPasswordService'
import { id } from 'date-fns/locale';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider()
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider)
  })

  it('should be able to reset the password', async () => {
    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    })

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const userToken = await fakeUserTokensRepository.generate(user.id)

    await resetPassword.execute({
      token: userToken.token,
      password: '51234'
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('51234')
    expect(updatedUser?.password).toBe('51234')
  });

  it('should not be able to reset the password with non-existing token', async () => {
   await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const fakeId = 'non-existing-user'
    const token = fakeUserTokensRepository.generate(fakeId)

    await expect(resetPassword.execute({
       token: (await token).token,
       password: '123456'
     })).rejects.toBeInstanceOf(AppError)
   })


  it('should not be able to reset password if passed more than 2 hours', async () => {
    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    })

    const userToken = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3)
    });

    await expect(
      resetPassword.execute({
      token: userToken.token,
      password: '51234'
    })).rejects.toBeInstanceOf(AppError)
  });


});
