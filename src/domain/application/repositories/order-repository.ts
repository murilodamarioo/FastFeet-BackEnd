import { Order } from '@domain/enterprise/entities/Order'

export abstract class OrderRepository {
  
  /**
   * Persists a new `Order` entity in the repository.
   *
   * @param {Order} order - The `Order` entity to be created.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  abstract create(order: Order): Promise<void>

}