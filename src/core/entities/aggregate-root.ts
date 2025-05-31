import { DomainEvent } from '@core/events/domain-event'
import { Entity } from './entity'

/**
 * Represents the base class for aggregate roots in the domain.
 * 
 * An aggregate root is an entity that is the entry point to an aggregate,
 * responsible for managing domain events and ensuring consistency within the aggregate.
 *
 * @typeParam Props - The properties type for the aggregate root entity.
 */
export class AggregateRoot<Props> extends Entity<Props> {

  private _domainEvents: DomainEvent[] = []

  /**
   * Gets the list of domain events associated with this aggregate root.
   */
  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  /**
   * Adds a domain event to the aggregate root's event list.
   *
   * @param event - The domain event to be added.
   */
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event)
  }

  /**
   * Clears all domain events from the aggregate root.
   */
  public clearEvents(): void {
    this._domainEvents = []
  }
}