import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Order, OrderProps } from '@domain/enterprise/entities/Order'
import { faker } from '@faker-js/faker'

export function makeOrder(override: Partial<OrderProps> = {}, id?: UniqueEntityId) {
  const courier = Order.create({
    recipientId: new UniqueEntityId(faker.string.uuid()),
    courierId: new UniqueEntityId(faker.string.uuid()),
    ...override
  }, id)

  return courier
}