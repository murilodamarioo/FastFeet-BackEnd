import { Either, failure, success } from '@core/either'
import { Recipient } from '@domain/enterprise/entities/Recipient'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { RecipientRepository } from '../repositories/recipient-repository'

export interface RegisterRecipientUseCaseRequest {
    name: string
    cpf: string
    email: string
    phone: string
    zipCode: string
    address: string
    neighborhood: string
    state: string
}

type RegisterRecipientUseCaseResponse = Either<RecipientAlreadyExistsError, { recipient: Recipient }>

export class RegisterRecipientUseCase {

  constructor(private recipientRepository: RecipientRepository) {}

  async execute({ 
    name, 
    cpf, 
    email, 
    phone, 
    zipCode, 
    address, 
    neighborhood, 
    state 
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipientWithSameEmail = await this.recipientRepository.findByEmail(email)

    if (recipientWithSameEmail) {
      return failure(new RecipientAlreadyExistsError())
    }

    const recipient = Recipient.create({
      name,
      cpf,
      email,
      phone,
      zipCode,
      address,
      neighborhood,
      state
    })

    await this.recipientRepository.create(recipient)

    return success({ recipient })
  }
}