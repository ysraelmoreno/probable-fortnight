import 'reflect-metadata'

import { injectable ,inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface Request {
  userId: string;
  avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    ) {
  }

  public async execute({ userId, avatarFileName }: Request): Promise<User>{

    const user = await this.usersRepository.findById({ id: userId })

    if(!user) {
      throw new AppError ('Only authenticated users can change avatar.', 401)
    }



    if(user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService
