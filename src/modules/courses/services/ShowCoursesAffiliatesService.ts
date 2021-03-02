import { injectable ,inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Affiliate from '../infra/typeorm/entities/Affiliate'
import AppError from '@shared/errors/AppError';

import IAffiliateRepository from '@modules/courses/repositories/IAffiliateRepository'

@injectable()
class ShowCourseContentService {

  constructor(
    @inject('AffiliatesRepository')
    private affiliatesRepository: IAffiliateRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
    ) {
  }

  public async execute(courseId: string): Promise<Affiliate[]> {
    let affiliates = await this.cacheProvider.recover<Affiliate[]>(`affiliates-list:${courseId}`)

    if(!affiliates) {
      affiliates = await this.affiliatesRepository.listAffiliates(courseId);

      await this.cacheProvider.save(`affiliates-list:${courseId}`, affiliates)
    }

    return affiliates
  }

}

export default ShowCourseContentService;
