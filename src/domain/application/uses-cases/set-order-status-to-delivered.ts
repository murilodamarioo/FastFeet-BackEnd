import { Either, failure, success } from '@core/either'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { SetOrderStatusError } from './errors/set-order-status-error'
import { OrdersRepository } from '../repositories/orders-repository'
import { Status, StatusUtils } from '@domain/enterprise/entities/value-object.ts/Status'
import { PhotoNotProvidedError } from './errors/photo-not-provided-error'

export interface SetOrderStatusToDeliveredUseCaseRequest {
  orderId: string
  photo: string
}

type SetOrderStatusToDeliveredUseCaseResponse = Either<OrderNotFoundError | SetOrderStatusError, null>

export class SetOrderStatusToDeliveredUseCase {

  constructor(private ordersRepository: OrdersRepository) {}

  async execute(
    { orderId, photo }: SetOrderStatusToDeliveredUseCaseRequest
  ): Promise<SetOrderStatusToDeliveredUseCaseResponse> {
    
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return failure(new OrderNotFoundError())
    }

    if (!StatusUtils.isPickedUp(order.status)) {
      return failure(new SetOrderStatusError(order.status, Status.DELIVERED))
    }

    if (photo === null || photo === undefined || photo === '') {
      return failure(new PhotoNotProvidedError())
    }

    order.status = Status.DELIVERED
    order.photo = photo

    return success(null)
  }
}