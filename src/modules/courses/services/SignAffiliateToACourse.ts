import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository'
import AppError from '@shared/errors/AppError'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IAffiliateRepository from '@modules/courses/repositories/IAffiliateRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import Affiliate from '../infra/typeorm/entities/Affiliate';

@injectable()
class SignAffiliateToACourse {

  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICourseRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AffiliatesRepository')
    private affiliatesRepository: IAffiliateRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
    ) {
  }

  public async execute(courseId: string, userId: string, type?: string): Promise<Affiliate> {
    const findUser = await this.usersRepository.findById(userId)

    if(!findUser) {
      throw new AppError('Cannot affiliate a inexistent user to a course')
    }

    const findCourse = await this.coursesRepository.findById(courseId);

    if(!findCourse) {
      throw new AppError('Cannot affiliate to a inexistent course')
    }

    const findAffiliate = await this.affiliatesRepository.findAffiliateById(userId);

    if(findAffiliate?.courseId === courseId) {
      throw new AppError('You already registered as affiliate to this course')
    }

    type ? type = 'normalplan' : type

    const affiliate = await this.affiliatesRepository.signAffiliate(courseId, userId, type)

    await this.cacheProvider.invalidatePrefix('affiliates-list')

    return affiliate

  }
}

export default SignAffiliateToACourse;
