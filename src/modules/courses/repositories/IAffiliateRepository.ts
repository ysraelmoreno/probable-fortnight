import Affiliate from '../infra/typeorm/entities/Affiliate'

export default interface IAffiliateRepository {
  signAffiliate(courseId: string, userId: string, type?: string,): Promise<Affiliate>;
  removeAffiliate(courseId: string, userId: string): Promise<void>;
  listAffiliates(courseId: string): Promise<Affiliate[]>;
  findAffiliateById(userId: string): Promise<Affiliate | undefined>;
}
