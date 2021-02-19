import UpdateProfileService from './UpdateProfileService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import ShowProfileService from './ShowProfileService';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let showProfileService: ShowProfileService;


describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show the profile', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password });

    await fakeUsersRepository.save(user)

    const profile = await showProfileService.execute(user.id)

    await expect(profile.name).toBe('John Doe')
    await expect(profile.email).toBe('johndoe@example.com')
  });

  it('should not be able to show the profile of non-existing user', async () => {
    await expect(showProfileService.execute('non-existing-id')).rejects.toBeInstanceOf(AppError)
  });

});
