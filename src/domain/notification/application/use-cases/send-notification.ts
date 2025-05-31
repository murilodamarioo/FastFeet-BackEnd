import { Either, success } from '@core/either'
import { NotificationsRepository } from '../repositories/notification-repository';
import { Notification } from '@domain/notification/enterprise/entities/notification';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>

export class SendNotificationUseCase {

  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, title, content }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return success({ notification })
  }
}