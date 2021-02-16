import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await createUser.execute({
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
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    expect(authenticateUser.execute({
      email: 'agathajoe@example.com.br',
      password: '1234agatha',
    })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate user with wrong email/password combination', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await createUser.execute({
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
