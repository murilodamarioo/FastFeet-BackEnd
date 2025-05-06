import { randomUUID } from 'node:crypto'

/**
 * A generic base class for entities.
 * 
 * @template Props - The type of the properties that define the entity.
 */
export class Entity<Props> {
  
  /**
   * The unique identifier of the entity.
   * 
   * @private
   * @type {string}
   */
  private _id: string

  /**
   * The properties of the entity.
   * 
   * @protected
   * @type {Props}
   */
  protected props: Props

  /**
   * Gets the unique identifier of the entity.
   * 
   * @returns {string} The unique identifier of the entity.
   */
  get id(): string {
    return this._id
  }

  /**
   * Creates an instance of Entity.
   * 
   * @param {Props} props - The properties of the entity.
   * @param {string} [id] - An optional unique identifier. If not provided, a new UUID will be generated.
   */
  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}