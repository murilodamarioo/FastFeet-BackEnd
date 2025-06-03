import { makeOrder } from '@test/factories/make-order'
import { OnStatusChanged } from './on-status-changed'
import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository'
import { InMemoryRecipientRepository } from '@test/repositories/in-memory-recipient-repository'
import { Status, StatusUtils } from '@domain/delivery/enterprise/entities/value-object.ts/Status'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository

describe('On status changed', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(inMemoryRecipientRepository)
  })

  it('should send a notification when the status is changed', async () => {
    const onStatusChanged = new OnStatusChanged()

    const order = makeOrder()
    await inMemoryOrderRepository.create(order)

    order.status = Status.PENDING

    await inMemoryOrderRepository.updateStatus(order)
  })
})