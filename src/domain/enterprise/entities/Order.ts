import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'
import { Status } from './value-object.ts/Status'
import { AggregateRoot } from '@core/entities/aggregate-root'

export interface OrderProps {
  recipientId: UniqueEntityId
  courierId: UniqueEntityId
  orderName: string
  postedAt?: Date | null
  pickedUp?: Date | null
  deliveredAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
  photo: string
  status: Status
}

export class Order extends AggregateRoot<OrderProps> {

  get recipientId() { return this.props.recipientId }

  get courierId() { return this.props.courierId }

  get orderName() { return this.props.orderName }
  set orderName(orderName: string) { this.orderName = `Package ${orderName}` }

  get postedAt() { return this.props.postedAt }
  set postedAt(value: Date | null | undefined) {
    this.props.postedAt = value
    this.touch()
  }

  get pickedUp() { return this.props.pickedUp }
  set pickedUp(value: Date | null | undefined) {
    this.props.pickedUp = value
    this.touch()
  }

  get deliveredAt() { return this.props.deliveredAt }
  set deliveredAt(value: Date | null | undefined) {
    this.props.deliveredAt = value
    this.touch()
  }

  get createdAt() { return this.props.createdAt }

  get updatedAt() { return this.props.updatedAt }

  get photo() { return this.props.photo }
  set photo(photo: string) { 
    this.props.photo = photo 
    this.touch()
  }

  get status() { return this.props.status }
  set status(status: Status) { 
    this.props.status = status 
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }


  /**
   * Creates a new instance of the `Order` entity.
   *
   * @param {Optional<OrderProps, 'photo' | 'status'>} props - 
   * An object containing the properties of the order. The following properties are optional:
   * - `photo`: Defaults to an empty string if not provided.
   * - `status`: Defaults to `Status.PENDING` if not provided.
   * - `createdAt`: Defaults to the current date if not provided.
   * @param {UniqueEntityId} [id] - The unique identifier for the order (optional).
   * 
   * @returns {Order} A new instance of the `Order` entity.
   *
   * @note The `createdAt` property will default to the current date if not provided.
   */
  static create(
      props: Optional<OrderProps, | 'photo' | 'status' | 'createdAt'>, 
      id?: UniqueEntityId
    ): Order {
      const order = new Order({
        ...props,
        createdAt: props.createdAt ?? new Date(),
        photo: props.photo ?? '',
        status: props.status ?? Status.CREATED,
      }, id)

      return order
    }
  
} 