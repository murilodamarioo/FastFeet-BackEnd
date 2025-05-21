import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository'
import { InMemoryRecipientRepository } from '@test/repositories/in-memory-recipient-repository'
import { SetOrderStatusToDeliveredUseCase } from './set-order-status-to-delivered'
import { makeCourier } from '@test/factories/make-courier'
import { makeOrder } from '@test/factories/make-order'
import { Status } from '@domain/enterprise/entities/value-object.ts/Status'
import { SetOrderStatusError } from './errors/set-order-status-error'
import { PhotoNotProvidedError } from './errors/photo-not-provided-error'

let inMemoryOrdersRepository: InMemoryOrderRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: SetOrderStatusToDeliveredUseCase

describe('Set order status to delivered', () => {
  
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrdersRepository = new InMemoryOrderRepository(inMemoryRecipientRepository)
    sut = new SetOrderStatusToDeliveredUseCase(inMemoryOrdersRepository)
  })

  it('should be able to change order status to Delivered', async () => {
    const courier = makeCourier()

    const order = makeOrder({
      courierId: courier.id,
      status: Status.PICKED_UP
    })
    inMemoryOrdersRepository.orders.push(order)

    const response = await sut.execute({
      orderId: order.id.toString(),
      photoId: 'package-photoId'
    })

    expect(response.isSuccess()).toBeTruthy()
    expect(inMemoryOrdersRepository.orders[0].status).toBe(Status.DELIVERED)
  })

  it('should not be able to change order status if the current status is not Picked Up', async () => {
    const courier = makeCourier()

    const order = makeOrder({
      courierId: courier.id,
      status: Status.PENDING
    })
    inMemoryOrdersRepository.orders.push(order)

    const response = await sut.execute({
      orderId: order.id.toString(),
      photoId: 'package-photoId'
    })

    expect(response.isFailure()).toBeTruthy()
    expect(response.value).toBeInstanceOf(SetOrderStatusError)
  })

  it('should not be able to change order status if photoId is not provided', async () => {
    const courier = makeCourier()

    const order = makeOrder({
      courierId: courier.id,
      status: Status.PICKED_UP
    })
    inMemoryOrdersRepository.orders.push(order)

    const response = await sut.execute({
      orderId: order.id.toString(),
      photoId: ''
    })

    expect(response.isFailure()).toBeTruthy()
    expect(response.value).toBeInstanceOf(PhotoNotProvidedError)
  })
})