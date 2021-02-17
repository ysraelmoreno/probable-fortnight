import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

import CreateUserService from './CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;



describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const name = "Ysrael Moreno";
    const email = "ysraelmoreno02@gmail.com"
    const password = "123456789"

    const user = await createUser.execute({
      name,
      email ,
      password,
    })

    expect(user).toHaveProperty('id')
  });

  it('should not be able to create two users with same email', async () => {
    const name = "Ysrael Moreno";
    const email = "ysraelmoreno02@gmail.com"
    const password = "123456789"

    const user = await createUser.execute({
      name,
      email ,
      password,
    })

    expect(createUser.execute({
      name,
      email ,
      password,
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});
