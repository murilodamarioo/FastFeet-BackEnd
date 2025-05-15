import { OrderRepository } from '@domain/application/repositories/order-repository'
import { Order } from '@domain/enterprise/entities/Order';

export class InMemoryOrderRepository extends OrderRepository {

  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

}