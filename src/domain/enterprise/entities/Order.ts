import { Entity } from '@core/entities/entity'
import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'
import { StatusEnum } from './value-object.ts/Status'

export interface OrderProps {
  recipientId: UniqueEntityId
  courierId: UniqueEntityId
  postedAt?: Date
  pickup?: Date | null
  deliveredAt?: Date | null
  photo: string
  status: StatusEnum
}

export class Order extends Entity<OrderProps> {

  get recipientId(): UniqueEntityId { return this.props.recipientId }

  get courierId(): UniqueEntityId { return this.props.courierId }

  get photo(): string { return this.props.photo }
  set photo(photo: string) { this.props.photo = photo }


  /**
   * Creates a new instance of the `Order` entity.
   *
   * @param {Optional<OrderProps, 'photo' | 'status'>} props - 
   * An object containing the properties of the order. The following properties are optional:
   * - `photo`: Defaults to an empty string if not provided.
   * - `status`: Defaults to `StatusEnum.PENDING` if not provided.
   * - `postedAt`: Defaults to the current date if not provided.
   * @param {UniqueEntityId} [id] - The unique identifier for the order (optional).
   * 
   * @returns {Order} A new instance of the `Order` entity.
   *
   * @note The `postedAt` property will default to the current date if not provided.
   */
  static create(
      props: Optional<OrderProps, | 'photo' | 'status'>, 
      id?: UniqueEntityId
    ): Order {
      const order = new Order({
        ...props,
        postedAt: props.postedAt ?? new Date(),
        photo: props.photo ?? '',
        status: props.status ?? StatusEnum.PENDING,
      }, id)

      return order
    }
  
}