import { CourierRepository } from '@domain/application/repositories/courier-repository'
import { Courier } from '@domain/enterprise/entities/Courier'

export class InMemoryCourierRepository extends CourierRepository {

  public couriers: Courier[] = []
  
  async findByCpf(cpf: string): Promise<Courier | null> {
    const courier = this.couriers.find(courier => courier.cpf === cpf)

    if (!courier) {
      return null
    }

    return courier
  }

  async findById(id: string): Promise<Courier | null> {
    const courier = this.couriers.find(courier => courier.id.toString()=== id)

    if (!courier) {
      return null
    }

    return courier
  }

  async create(courier: Courier): Promise<void> {
    this.couriers.push(courier)
  }

  async save(courier: Courier): Promise<void> {
    const itemIndex = this.couriers.findIndex((item) => item.id === courier.id)

    this.couriers[itemIndex] = courier
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.couriers.findIndex(courier => courier.id.toString() === id)
    
    this.couriers.splice(itemIndex, 1)
  }

}