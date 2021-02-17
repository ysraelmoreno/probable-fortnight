import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'


let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatar: UpdateUserAvatarService;


describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)
  })
  it('should be able to update a user avatar', async () => {
    const name = "John Doe";
    const email = "johndoe@example.com"
    const password = "123456789"

    const user = await fakeUsersRepository.create({ name, email, password });
    const avatar = await updateUserAvatar.execute({ userId: user.id, avatarFileName: 'avatar.jpg' })

    expect(user.avatar).toBe('avatar.jpg')
  });

});
