import { NotificationsRepository } from '@domain/notification/application/repositories/notification-repository'
import { Notification } from '@domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository extends NotificationsRepository {
  
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
  
}