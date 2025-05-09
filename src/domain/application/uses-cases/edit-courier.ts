import { CourierNotFoundError } from './errors/courier-not-found-error';
import { Either, failure, success } from '@core/either'
import { CourierRepository } from '../repositories/courier-repository'
import { Courier } from '@domain/enterprise/entities/Courier';

export interface EditCourierUseCaseRequest {
  courierId: string
  name: string
  cpf: string
  email: string
  password: string
}

type EditCourierUseCaseResponse = Either<CourierNotFoundError, { courier: Courier }>

export class EditCourierUseCase {

  constructor(private courierRepository: CourierRepository) {}

  async execute({courierId, name, cpf, email, password}: EditCourierUseCaseRequest): Promise<EditCourierUseCaseResponse> {
    const courier = await this.courierRepository.findById(courierId)

    if (!courier) {
      return failure(new CourierNotFoundError())
    }

    courier.name = name
    courier.cpf = cpf
    courier.email = email
    courier.password = password

    await this.courierRepository.save(courier)

    return success({ courier })
  }

}