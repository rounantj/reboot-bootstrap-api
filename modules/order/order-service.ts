import { PrismaClient } from '@prisma/client'
import {
  OrderDestroyResponseDTO,
  OrderFetchAllPayloadDTO,
  OrderFetchAllResponseDTO,
  OrderFetchOneResponseDTO,
  OrderSavePayloadDTO,
  OrderSaveResponseDTO,
  OrderUpdatePayloadDTO,
  OrderUpdateResponseDTO,
} from './order-interfaces'
import OrderRepository from './order-repository'

export default class orderService {
  private readonly orderRepository: OrderRepository

  constructor(public prismaClient: PrismaClient) {
    this.orderRepository = new OrderRepository(prismaClient)
  }

  async fetchAll(
    params: OrderFetchAllPayloadDTO
  ): Promise<OrderFetchAllResponseDTO> {
    const order = await this.orderRepository.all(params)
    return { order }
  }

  async fetchById(
    id: number,
    params: OrderFetchAllPayloadDTO
  ): Promise<OrderFetchOneResponseDTO> {
    const order = await this.orderRepository.get(id, params)
    return { order }
  }


  async store(payload: OrderSavePayloadDTO): Promise<OrderSaveResponseDTO> {
    console.log(payload)
    const order = await this.orderRepository.save(payload)
    return { order }
  }

  async update(
    id: number,
    payload: OrderUpdatePayloadDTO
  ): Promise<OrderUpdateResponseDTO> {
    const order = await this.orderRepository.update(id, payload)
    return { order }
  }

  async destroy(id: number): Promise<OrderDestroyResponseDTO> {
    const order = await this.orderRepository.delete(id)
    return { order }
  }
}
