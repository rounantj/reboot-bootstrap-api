import { PrismaClient } from '@prisma/client'
import {
  ProductDestroyResponseDTO,
  ProductFetchAllPayloadDTO,
  ProductFetchAllResponseDTO,
  ProductFetchOneResponseDTO,
  ProductSavePayloadDTO,
  ProductSaveResponseDTO,
  ProductUpdatePayloadDTO,
  ProductUpdateResponseDTO,
} from './product-interfaces'
import ProductRepository from './product-repository'

export default class productService {
  private readonly productRepository: ProductRepository

  constructor(public prismaClient: PrismaClient) {
    this.productRepository = new ProductRepository(prismaClient)
  }

  async fetchAll(
    params: ProductFetchAllPayloadDTO
  ): Promise<ProductFetchAllResponseDTO> {
    const products = await this.productRepository.all(params)
    return { products }
  }

  async fetchById(
    id: number,
    params: ProductFetchAllPayloadDTO
  ): Promise<ProductFetchOneResponseDTO> {
    const product = await this.productRepository.get(id, params)
    return { product }
  }

  async fetchBySlug(
    slug: string,
    params: ProductFetchAllPayloadDTO
  ): Promise<ProductFetchOneResponseDTO> {
    const product = await this.productRepository.getBySlug(slug, params)
    return { product }
  }


  async fetchByEan(
    ean: string,
    params: ProductFetchAllPayloadDTO
  ): Promise<ProductFetchOneResponseDTO> {
    const product = await this.productRepository.getByEan(ean, params)
    return { product }
  }


  async store(payload: ProductSavePayloadDTO): Promise<ProductSaveResponseDTO> {
    const product = await this.productRepository.save(payload)
    return { product }
  }

  async update(
    id: number,
    payload: ProductUpdatePayloadDTO
  ): Promise<ProductUpdateResponseDTO> {
    const product = await this.productRepository.update(id, payload)
    return { product }
  }

  async destroy(id: number): Promise<ProductDestroyResponseDTO> {
    const product = await this.productRepository.delete(id)
    return { product }
  }
}
