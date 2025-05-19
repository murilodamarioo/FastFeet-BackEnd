import { Either, failure, success } from '@core/either'
import { OrdersRepository } from '../repositories/orders-repository'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { Status, StatusUtils } from '@domain/enterprise/entities/value-object.ts/Status'
import { SetOrderStatusError } from './errors/set-order-status-error'

export interface SetOrderStatusToPickedUpUseCaseRequest {
  orderId: string
}

type SetOrderStatusToPickedUpUseCaseResponse = Either<OrderNotFoundError, null>

export class SetOrderStatusToPickedUpUseCase {
  
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(
    { orderId }: SetOrderStatusToPickedUpUseCaseRequest
  ): Promise<SetOrderStatusToPickedUpUseCaseResponse> {

    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return failure(new OrderNotFoundError())
    }

    if (!StatusUtils.isPending(order.status)) {
      return failure(new SetOrderStatusError(order.status, Status.PICKED_UP))
    }

    order.status = Status.PICKED_UP

    await this.ordersRepository.save(order)

    return success(null)
  }
}