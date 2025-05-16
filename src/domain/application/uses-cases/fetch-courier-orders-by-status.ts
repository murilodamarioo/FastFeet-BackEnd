import { Either, failure, success } from '@core/either'
import { OrdersRepository } from '../repositories/orders-repository'
import { CouriersRepository } from '../repositories/couriers-repository'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { Order } from '@domain/enterprise/entities/Order'

export interface FetchCourierOrdersByStatusUseCaseRequest {
  courierId: string
  status: string
}

type FetchCourierOrdersByStatusUseCaseResponse = Either<CourierNotFoundError , { orders: Order[] }>

export class FetchCourierOrdersByStatusUseCase {

  constructor(
    private ordersReposiotory: OrdersRepository,
    private couriersRepository: CouriersRepository
  ) {}

  async execute(
    { courierId, status }: FetchCourierOrdersByStatusUseCaseRequest
  ): Promise<FetchCourierOrdersByStatusUseCaseResponse> {

    const courier = await this.couriersRepository.findById(courierId)
  
    if (!courier) {
      return failure(new CourierNotFoundError())
    }

    const orders = await this.ordersReposiotory.findManyByStatus(courierId, status)

    return success({ orders })
  }
}