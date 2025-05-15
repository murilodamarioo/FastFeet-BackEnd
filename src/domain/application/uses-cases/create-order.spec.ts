import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository'
import { CreateOrderUseCase } from './create-order'
import { makeOrder } from '@test/factories/make-order'

let sut: CreateOrderUseCase
let inMemoryOrderRepository: InMemoryOrderRepository

describe('Create Order', () => {

  beforeAll(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(inMemoryOrderRepository)
  })

  it('should create an order', async () => {
    const order = makeOrder()

    const response = await sut.execute({
      recipientId: order.recipientId.toString(),
      courierId: order.courierId.toString(),
    })

    expect(response.isSuccess).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
  })
})