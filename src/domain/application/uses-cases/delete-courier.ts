import { Either, failure, success } from '@core/either'
import { CourierRepository } from '../repositories/courier-repository'
import { CourierNotFoundError } from './errors/courier-not-found-error'

export interface DeleteCourierUseCaseRequest {
  courierId: string
}

type DeleteCourierUseCaseResponse = Either<CourierNotFoundError, null>

export class DeleteCourierUseCase {

  constructor(private courierRepository: CourierRepository) {}

  async execute({ courierId }: DeleteCourierUseCaseRequest): Promise<DeleteCourierUseCaseResponse> {
    const courier = await this.courierRepository.findById(courierId)

    if(!courier) {
      return failure(new CourierNotFoundError())
    }

    this.courierRepository.delete(courierId)


    return success(null)
  }
}