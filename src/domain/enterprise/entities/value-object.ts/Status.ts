export enum StatusEnum {
  PENDING = 'pending',
  PICKED_UP = 'picked_up',
  DELIVERED = 'delivered',
  RETURNED = 'returned'
}

export class Status {

  public value: StatusEnum
  
  private constructor(value: StatusEnum) {
    this.value = value
  }

  private getValue(): StatusEnum {
    return this.value
  }

  private isPending(): boolean {
    return this.getValue() === StatusEnum.PENDING
  }

  private isPickedUp(): boolean {
    return this.getValue() === StatusEnum.PICKED_UP
  }

  private isDelivered(): boolean {
    return this.getValue() === StatusEnum.DELIVERED
  }

  private isReturned(): boolean {
    return this.getValue() === StatusEnum.RETURNED
  }

}