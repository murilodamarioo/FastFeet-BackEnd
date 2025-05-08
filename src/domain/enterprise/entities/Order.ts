import { Entity } from '@core/entities/entity'
import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'
import { Status } from './value-object.ts/Status'

export interface OrderProps {
  recipientId: UniqueEntityId
  courierId: UniqueEntityId
  postedAt?: Date
  pickup?: Date | null
  deliveredAt?: Date | null
  photo: string
  status: Status
}

export class Order extends Entity<OrderProps> {

  get recipientId(): UniqueEntityId { return this.props.recipientId }

  get courierId(): UniqueEntityId { return this.props.courierId }

  get photo(): string { return this.props.photo }
  set photo(photo: string) { this.props.photo = photo }


  /**
 * Creates a new instance of Order.
 *
 * @param {Optional<OrderProps, 'postedAt' | 'pickup' | 'deliveredAt'>} props - Object containing the order's properties.
 * @param {UniqueEntityId} [id] - Unique ID of the order (optional).
 * @returns {Order} Created order instance.
 *
 * @note The `postedAt`, `pickup`, and `deliveredAt` properties are optional and will default to the current date if not provided.
 */
  static create(
      props: Optional<OrderProps, 'postedAt' | 'pickup' | 'deliveredAt'>, 
      id?: UniqueEntityId
    ): Order {
      const order = new Order({
        ...props,
        postedAt: props.postedAt ?? new Date(),
        pickup: props.pickup ?? new Date(),
        deliveredAt: props.deliveredAt ?? new Date(),
      }, id)

      return order
    }
  
}