import { OrdersRepository } from '@domain/application/repositories/orders-repository'
import { Order } from '@domain/enterprise/entities/Order'
import { InMemoryRecipientRepository } from './in-memory-recipient-repository'
import { OrderDetails } from '@domain/enterprise/entities/value-object.ts/order-details'

export class InMemoryOrderRepository implements OrdersRepository {
  
  public orders: Order[] = []

  constructor(private inMemoryRecipientRepository: InMemoryRecipientRepository) {}

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((order) => order.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async findOrderDetailsById(id: string): Promise<OrderDetails | null> {
    const order = this.orders.find((order) => order.id.toString() === id)
    
    if (!order) {
      return null
    }

    const recipient = this.inMemoryRecipientRepository.recipients.find((recipient) => {
      return recipient.id.equals(order.recipientId)
    })


    if (!recipient) {
      throw new Error(`
        Recipient with ID "${order.recipientId.toString()}" does not exist.`
      )
    }

    const orderDetails = OrderDetails.create({
      recipientId: order.recipientId,
      courierId: order.courierId,
      recipient: recipient.name,
      address: recipient.address,
      neighborhood: recipient.neighborhood,
      zipCode: recipient.zipCode,
      state: recipient.state,
      status: order.status,
      postedAt: order.postedAt,
      pickupAt: order.pickupAt,
      deliveredAt: order.deliveredAt,
    })

    return orderDetails
  }

  async findManyByStatus(courierId: string, status: string): Promise<Order[]> {
    const orders = this.orders.filter((order) => 
      order.courierId.toString() === courierId && order.status === status 
    )

    return orders
  }

  async create(order: Order): Promise<void> {
    this.orders.push(order)
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.orders.findIndex((item) => {
      return item.id === order.id
    })

    this.orders[orderIndex] = order
  }
}