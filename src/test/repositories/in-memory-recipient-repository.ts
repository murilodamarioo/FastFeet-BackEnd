import { RecipientRepository } from "@domain/application/repositories/recipient-repository"
import { Recipient } from "@domain/enterprise/entities/Recipient"

export class InMemoryRecipientRepository extends RecipientRepository {
  
  public recipients: Recipient[] = []

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = this.recipients.find(recipient => recipient.email === email)

    return recipient ? recipient : null
  }

  async create(recipient: Recipient): Promise<void> {
    this.recipients.push(recipient)
  }
}