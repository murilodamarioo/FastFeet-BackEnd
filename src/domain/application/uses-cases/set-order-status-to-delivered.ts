import { Either, failure, success } from '@core/either'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { SetOrderStatusError } from './errors/set-order-status-error'
import { OrdersRepository } from '../repositories/orders-repository'
import { Status, StatusUtils } from '@domain/enterprise/entities/value-object.ts/Status'
import { OrderPhoto } from '@domain/enterprise/entities/order-photo'
import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { PhotoNotProvidedError } from './errors/photo-not-provided-error'

export interface SetOrderStatusToDeliveredUseCaseRequest {
  orderId: string
  photoId: string
}

type SetOrderStatusToDeliveredUseCaseResponse = Either<
  OrderNotFoundError | SetOrderStatusError | PhotoNotProvidedError,
  null
>
export class SetOrderStatusToDeliveredUseCase {

  constructor(private ordersRepository: OrdersRepository) {}

  async execute(
    { orderId, photoId }: SetOrderStatusToDeliveredUseCaseRequest
  ): Promise<SetOrderStatusToDeliveredUseCaseResponse> {
    
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return failure(new OrderNotFoundError())
    }

    if (!StatusUtils.isPickedUp(order.status)) {
      return failure(new SetOrderStatusError(order.status, Status.DELIVERED))
    }

    if (photoId === '' || photoId === undefined || photoId === null) {
      return failure(new PhotoNotProvidedError())
    }

    const photoAttachment = OrderPhoto.create({
      orderId: order.id,
      photoId: new UniqueEntityId(photoId)
    })

    order.status = Status.DELIVERED
    order.photo = photoAttachment

    await this.ordersRepository.save(order)

    return success(null)
  }
}