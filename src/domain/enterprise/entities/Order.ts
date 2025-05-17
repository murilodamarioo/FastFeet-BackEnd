import { Entity } from '@core/entities/entity'
import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'
import { StatusEnum } from './value-object.ts/Status'
import { AggregateRoot } from '@core/entities/aggregate-root'

export interface OrderProps {
  recipientId: UniqueEntityId
  courierId: UniqueEntityId
  postedAt: Date
  pickupAt?: Date | null
  deliveredAt?: Date | null
  photo: string
  status: StatusEnum
}

export class Order extends AggregateRoot<OrderProps> {

  get recipientId() { return this.props.recipientId }

  get courierId() { return this.props.courierId }

  get postedAt() { return this.props.postedAt }

  get pickupAt() { return this.props.pickupAt }

  get deliveredAt() { return this.props.deliveredAt }

  get photo() { return this.props.photo }
  set photo(photo: string) { this.props.photo = photo }

  get status() { return this.props.status }
  set status(status: StatusEnum) { this.props.status = status }


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