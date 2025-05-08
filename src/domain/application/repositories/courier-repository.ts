import { Courier } from '@domain/enterprise/entities/Courier'

export abstract class CourierRepository {

  /**
   * Retrieves a courier by its CPF.
   * 
   * @param {string} cpf - The CPF of the courier to be retrieved.
   * @returns {Promise<Courier | null>} A promise that resolves with the found courier, or null if not found.
   */
  abstract findByCpf(cpf: string): Promise<Courier | null>


  /**
   * Retrieves a courier by its ID.
   * 
   * @param {string} id - The ID of the courier to be retrieved.
   * @returns {Promise<Courier | null>} A promise that resolves with the found courier, or null if not found.
   */
  abstract findById(id: string): Promise<Courier | null>
  
  /**
   * Creates a new courier.
   * 
   * @param {Courier} courier The courier to be created.
   * @returns {Promise<void>} A promise that resolves with void after the courier creation.
   */
  abstract create(courier: Courier): Promise<void>

}