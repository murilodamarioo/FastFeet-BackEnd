import { Order } from '@domain/enterprise/entities/Order'

export abstract class OrdersRepository {
  
  /**
   * Persists a new `Order` entity in the repository.
   *
   * @param {Order} order - The `Order` entity to be created.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  abstract create(order: Order): Promise<void>


  /**
   * Retrieves all orders for a specific courier filtered by status.
   *
   * @param {string} courierId - The unique identifier of the courier.
   * @param {string} status - The status to filter orders by.
   * @returns {Promise<Order[]>} A promise that resolves to an array of orders matching the criteria.
   */
  abstract findManyByStatus(courierId: string, status: string): Promise<Order[]>

}