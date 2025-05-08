import { UseCaseError } from '@core/errors/use-case-error'

export class CourierAlreadyExistsError extends Error implements UseCaseError {

  constructor() {
    super('Courier with the same CPF already exists')
  }

}