import { Either, failure, success } from '@core/either'
import { Recipient } from '@domain/enterprise/entities/Recipient'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { RecipientsRepository } from '../repositories/recipients-repository'

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

  constructor(private recipientsRepository: RecipientsRepository) {}

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
    const recipientWithSameEmail = await this.recipientsRepository.findByEmail(email)

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

    await this.recipientsRepository.create(recipient)

    return success({ recipient })
  }
}