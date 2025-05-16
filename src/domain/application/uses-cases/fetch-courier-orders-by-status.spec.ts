import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository'
import { FetchCourierOrdersByStatusUseCase } from './fetch-courier-orders-by-status'
import { InMemoryCourierRepository } from '@test/repositories/in-memory-courier-reposiotry'
import { makeCourier } from '@test/factories/make-courier'
import { makeOrder } from '@test/factories/make-order'
import { StatusEnum } from '@domain/enterprise/entities/value-object.ts/Status'
import { Order } from '@domain/enterprise/entities/Order'

let sut: FetchCourierOrdersByStatusUseCase
let ordersRepository: InMemoryOrderRepository
let courierRepository: InMemoryCourierRepository

describe('Fetch Orders by Status', () => {

  beforeEach(() => {
    ordersRepository = new InMemoryOrderRepository()
    courierRepository = new InMemoryCourierRepository()
    sut = new FetchCourierOrdersByStatusUseCase(ordersRepository, courierRepository)
  })

  it('should be able to fetch orders by DELIVRED status', async () => {
    const courier = makeCourier()

    await courierRepository.create(courier)

    const orders = [
      makeOrder({ courierId: courier.id }),
      makeOrder({ courierId: courier.id }),
      makeOrder({ courierId: courier.id, status: StatusEnum.DELIVERED }),
      makeOrder(),
      makeOrder(),
    ]

    for (const order of orders) {
      await ordersRepository.create(order)
    }

    const response = await sut.execute({ courierId: courier.id.toString(), status: StatusEnum.DELIVERED })

    expect(response.isSuccess()).toBeTruthy()
    if (response.isSuccess()) {
      expect((response.value as { orders: Order[] }).orders).toHaveLength(1)
    }
  })

  it('should be able to fetch orders by PENDING status', async () => {
    const courier = makeCourier()

    await courierRepository.create(courier)

    const orders = [
      makeOrder({ courierId: courier.id }),
      makeOrder({ courierId: courier.id }),
      makeOrder({ courierId: courier.id, status: StatusEnum.DELIVERED }),
      makeOrder({ courierId: courier.id, status: StatusEnum.RETURNED }),
      makeOrder({ courierId: courier.id, status: StatusEnum.PICKED_UP }),
    ]

    for (const order of orders) {
      await ordersRepository.create(order)
    }

    const response = await sut.execute({ courierId: courier.id.toString(), status: StatusEnum.PENDING })

    expect(response.isSuccess()).toBeTruthy()
    if (response.isSuccess()) {
      expect((response.value as { orders: Order[] }).orders).toHaveLength(2)
    }
  })
})