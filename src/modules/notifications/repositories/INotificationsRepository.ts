import Notification from '../infra/schemas/Notification'
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO'

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
