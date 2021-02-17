import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({
      name,
      email ,
      password,
    })

    const response = await authenticateUser.execute({
      email,
      password,
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  });

  it('should not be able to authenticate with non existent user', async () => {

    expect(authenticateUser.execute({
      email: 'agathajoe@example.com.br',
      password: '1234agatha',
    })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate user with wrong email/password combination', async () => {

    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({
      name,
      email ,
      password,
    })

    expect(authenticateUser.execute({
      email: 'jonndoe@example.com.br',
      password,
    })
    ).rejects.toBeInstanceOf(AppError);

    expect(authenticateUser.execute({
      email,
      password: '41233',
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});
