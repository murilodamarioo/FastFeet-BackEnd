import { OrdersRepository } from '@domain/application/repositories/orders-repository'
import { Order } from '@domain/enterprise/entities/Order';

export class InMemoryOrderRepository extends OrdersRepository {

  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

}