import UpdateProfileService from './UpdateProfileService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;


describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to update the user profile', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password });

    await fakeUsersRepository.save(user)

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'Jonathan Doe',
      email: 'jonathandoe@example.com',
    })

    await expect(updatedUser.name).toBe('Jonathan Doe')
    await expect(updatedUser.email).toBe('jonathandoe@example.com')
  });

  it('should not be able to update a non-existing profile', async () => {
    await expect(updateProfileService.execute({
      userId: 'asdasd',
      name: 'Jonathan Doe',
      email: 'jonathandoe@example.com',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to update the user profile with a email already used', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    await fakeUsersRepository.create({ name, email, password });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456' });

    expect(updateProfileService.execute({
      userId: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update the user password', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password });

    await fakeUsersRepository.save(user)

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'Jonathan Doe',
      email: 'jonathandoe@example.com',
      oldPassword: '123456789',
      password: '123123'
    })

    await expect(updatedUser.password).toBe('123123')
  });

  it('should not be able to update the password with non-existing oldPassword', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password });

    await fakeUsersRepository.save(user)

    await expect(updateProfileService.execute({
      userId: user.id,
      name: 'Jonathan Doe',
      email: 'jonathandoe@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to update the password with a wrong oldPassword', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password });

    await fakeUsersRepository.save(user)

    await expect(updateProfileService.execute({
      userId: user.id,
      name: 'Jonathan Doe',
      email: 'jonathandoe@example.com',
      oldPassword: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });
});
