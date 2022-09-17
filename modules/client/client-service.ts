import { PrismaClient } from '@prisma/client'
import {
  ClientDestroyResponseDTO,
  ClientFetchAllPayloadDTO,
  ClientFetchAllResponseDTO,
  ClientFetchOneResponseDTO,
  ClientSavePayloadDTO,
  ClientSaveResponseDTO,
  ClientUpdatePayloadDTO,
  ClientUpdateResponseDTO,
} from './client-interfaces'
import ClientRepository from './client-repository'

export default class ClientService {
  private readonly ClientRepository: ClientRepository

  constructor(public prismaClient: PrismaClient) {
    this.ClientRepository = new ClientRepository(prismaClient)
  }

  async fetchAll(
    params: ClientFetchAllPayloadDTO
  ): Promise<ClientFetchAllResponseDTO> {
    const client = await this.ClientRepository.all(params)
    return { client }
  }

  async fetchById(
    id: number,
    params: ClientFetchAllPayloadDTO
  ): Promise<ClientFetchOneResponseDTO> {
    const client = await this.ClientRepository.get(id, params)
    return { client }
  }

  async fetchBySlug(
    slug: string,
    params: ClientFetchAllPayloadDTO
  ): Promise<ClientFetchOneResponseDTO> {
    const client = await this.ClientRepository.getBySlug(slug, params)
    return { client }
  }

  async store(payload: ClientSavePayloadDTO): Promise<ClientSaveResponseDTO> {
    const client = await this.ClientRepository.save(payload)
    return { client }
  }

  async update(
    id: number,
    payload: ClientUpdatePayloadDTO
  ): Promise<ClientUpdateResponseDTO> {
    const client = await this.ClientRepository.update(id, payload)
    return { client }
  }

  async destroy(id: number): Promise<ClientDestroyResponseDTO> {
    const client = await this.ClientRepository.delete(id)
    return { client }
  }
}
