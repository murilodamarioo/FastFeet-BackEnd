import { AdminRepository } from '@domain/application/repositories/admin-repository'
import { Admin } from '@domain/enterprise/entities/Admin';

export class InMemoryAdminRepository extends AdminRepository {

  public admins: Admin[] = []

  async findByCpf(cpf: string): Promise<Admin | null> {
    const admin = this.admins.find(admin => admin.cpf === cpf)

    return admin ? admin : null
  }
  
  async create(admin: Admin): Promise<void> {
    this.admins.push(admin)
  }

}