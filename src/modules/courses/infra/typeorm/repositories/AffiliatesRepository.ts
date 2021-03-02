import { getRepository, Repository, Not } from 'typeorm';

import IAffiliateRepository from '@modules/courses/repositories/IAffiliateRepository'
import Affiliate from '../entities/Affiliate';

class AffiliatesRepository implements IAffiliateRepository {
  private ormRepository: Repository<Affiliate>

  constructor() {
    this.ormRepository = getRepository(Affiliate)
  }

  public async findAffiliateById(userId: string): Promise<Affiliate | undefined> {
    const findAffiliate = await this.ormRepository.findOne({
      where: { affiliateId: userId }
    });

    return findAffiliate
  }

  public async signAffiliate(courseId: string, userId: string, type: string): Promise<Affiliate> {
    const affiliate = this.ormRepository.create({ courseId, affiliateId: userId, type });

    await this.ormRepository.save(affiliate);

    return affiliate
  }

  public async removeAffiliate(courseId: string, userId: string): Promise<void> {
    const findCourseAffiliate = await this.ormRepository.find({
      where: {
        affiliate: userId,
        courseId: courseId
      }
    });

    await this.ormRepository.remove(findCourseAffiliate);
  }

  public async listAffiliates(courseId: string): Promise<Affiliate[]> {
    const affiliates = await this.ormRepository.find({
      where: { courseId }
    });

    return affiliates
  }
}

export default AffiliatesRepository;
