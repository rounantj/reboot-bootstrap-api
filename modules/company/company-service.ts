import { PrismaClient } from '@prisma/client'
import {
  CompanyDestroyResponseDTO,
  CompanyFetchAllPayloadDTO,
  CompanyFetchAllResponseDTO,
  CompanyFetchOneResponseDTO,
  CompanySavePayloadDTO,
  CompanySaveResponseDTO,
  CompanyUpdatePayloadDTO,
  CompanyUpdateResponseDTO,
} from './company-interfaces'
import CompanyRepository from './company-repository'

export default class orderService {
  private readonly companyRepository: CompanyRepository

  constructor(public prismaClient: PrismaClient) {
    this.companyRepository = new CompanyRepository(prismaClient)
  }

  async fetchAll(
    params: CompanyFetchAllPayloadDTO
  ): Promise<CompanyFetchAllResponseDTO> {
    const company = await this.companyRepository.all(params)
    return { company }
  }

  async fetchById(
    id: number,
    params: CompanyFetchAllPayloadDTO
  ): Promise<CompanyFetchOneResponseDTO> {
    const company = await this.companyRepository.get(id, params)
    return { company }
  }

  async fetchBySlug(
    slug: string,
    params: CompanyFetchAllPayloadDTO
  ): Promise<CompanyFetchOneResponseDTO> {
    const company = await this.companyRepository.getBySlug(slug, params)
    return { company }
  }




  async store(payload: CompanySavePayloadDTO): Promise<CompanySaveResponseDTO> {
    const company = await this.companyRepository.save(payload)
    return { company }
  }

  async update(
    id: number,
    payload: CompanyUpdatePayloadDTO
  ): Promise<CompanyUpdateResponseDTO> {
    const company = await this.companyRepository.update(id, payload)
    return { company }
  }

  async destroy(id: number): Promise<CompanyDestroyResponseDTO> {
    const company = await this.companyRepository.delete(id)
    return { company }
  }
}
