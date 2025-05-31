import { Notification } from "@domain/notification/enterprise/entities/notification";

export abstract class NotificationsRepository {

  /**
   * Persists a new notification entity in the repository.
   *
   * @param notification - The notification entity to be created and stored.
   * @returns A promise that resolves when the operation is complete.
   */
  abstract create(notification: Notification): Promise<void>

}