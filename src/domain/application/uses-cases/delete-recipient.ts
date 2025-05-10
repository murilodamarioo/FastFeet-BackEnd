import { Either, failure, success } from '@core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientNotFoundError } from './errors/recipient-not-found-error'

export interface DeleteRecipientUseCaseRequest {
  recipientId: string
}

type DeleteRecipientUseCaseResponse = Either<RecipientNotFoundError, null>

export class DeleteRecipientUseCase {

  constructor(private recipientRepository: RecipientRepository) {}

  async execute({ recipientId }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      return failure(new RecipientNotFoundError())
    }

    await this.recipientRepository.delete(recipientId)

    return success(null)
  }

}