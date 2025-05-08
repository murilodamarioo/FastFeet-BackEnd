import { Courier } from '@domain/enterprise/entities/Courier'
import { CourierRepository } from '../repositories/courier-repository'
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

  constructor(private courierRepository: CourierRepository) {}

  async execute({ name, email, cpf, password }: RegisterCourierUseCaseRequest): Promise<ResgisterCourierUseCaseResponse> {

    const courierWithSameCpf = await this.courierRepository.findByCpf(cpf)

    if (courierWithSameCpf) {
      return failure(new CourierAlreadyExistsError())
    }

    const courier = Courier.create({
      name,
      email,
      password,
      cpf
    })

    await this.courierRepository.create(courier)

    return success({ courier })
  }
}