import { Courier } from '@domain/enterprise/entities/Courier'
import { CouriersRepository } from '../repositories/couriers-repository'
import { Either, failure, success } from '@core/either'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'

interface RegisterCourierUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

type ResgisterCourierUseCaseResponse = Either<CourierAlreadyExistsError, { courier: Courier }>

export class RegisterCourierUseCase {

  constructor(private couriersRepository: CouriersRepository) {}

  async execute({ name, email, cpf, password }: RegisterCourierUseCaseRequest): Promise<ResgisterCourierUseCaseResponse> {

    const courierWithSameCpf = await this.couriersRepository.findByCpf(cpf)

    if (courierWithSameCpf) {
      return failure(new CourierAlreadyExistsError())
    }

    const courier = Courier.create({
      name,
      email,
      password,
      cpf
    })

    await this.couriersRepository.create(courier)

    return success({ courier })
  }
}