import { Either, success } from '@core/either'
import { Order } from '@domain/enterprise/entities/Order'
import { OrderRepository } from '../repositories/order-repository'
import { UniqueEntityId } from '@core/entities/unique-entity-id'

export interface CreateOrderUseCaseRequest {
  recipientId: string
  courierId: string
}

type CreateOrderUseCaseResponse = Either<null, { order: Order }>

export class CreateOrderUseCase {

  constructor(private orderepository: OrderRepository) {}

  async execute({ recipientId, courierId }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityId(recipientId),
      courierId: new UniqueEntityId(courierId),
    });

    await this.orderepository.create(order)

    return success({ order })
  }
}