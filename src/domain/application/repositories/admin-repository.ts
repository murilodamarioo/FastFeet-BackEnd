import { Admin } from "@domain/enterprise/entities/Admin";

export abstract class AdminRepository {

  /**
   * Finds an Admin entity by CPF.
   *
   * @param {string} cpf - The CPF of the Admin to find.
   * @returns {Promise<Admin | null>} A promise that resolves with the Admin entity if found, or null if not found.
   */
  abstract findByCpf(cpf: string): Promise<Admin | null>

  /**
   * Create a new Admin.
   *
   * @param {Admin} admin - The Admin entity to be created.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  abstract create(admin: Admin): Promise<void>

}