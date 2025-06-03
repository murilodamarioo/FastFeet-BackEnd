import { DomainEvents } from '@core/events/domain-events'
import { EventHandler } from '@core/events/event-handler'
import { ChangeStatusEvent } from '@domain/delivery/enterprise/events/change-status-event'

export class OnStatusChanged implements EventHandler {
  
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewStatusNotification.bind(this), 
      ChangeStatusEvent.name
    )
  }

  private async sendNewStatusNotification({ order }: ChangeStatusEvent) {
    console.log(order)
  }
}