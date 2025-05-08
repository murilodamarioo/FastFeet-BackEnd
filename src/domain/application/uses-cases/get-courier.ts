import { Either, failure, success } from '@core/either'
import { CourierRepository } from '../repositories/courier-repository'
import { Courier } from '@domain/enterprise/entities/Courier'
import { CourierNotFoundError } from './errors/courier-not-found-error'

export interface GetCourierUseCaseRequest {
  courierId: string
}

type GetCourierUseCaseResponse = Either<Error, { courier: Courier }>

export class GetCourierUseCase {
  
  constructor(private courierRepository: CourierRepository) {}

  async execute({ courierId }: GetCourierUseCaseRequest): Promise<GetCourierUseCaseResponse> {
    
    const courier = await this.courierRepository.findById(courierId)

    if(!courier) {
      return failure(new CourierNotFoundError())
    }

    return success({ courier })
  }
}