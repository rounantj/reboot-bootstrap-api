import { PrismaClient, order } from "@prisma/client";
import { OrderFetchAllPayloadDTO } from "./order-interfaces";

export default class orderRepository {
  constructor(private readonly client: PrismaClient) { }


  public async all(params: OrderFetchAllPayloadDTO): Promise<Array<order>> {
    const data = await this.client.order.findMany({
      include: {
        category: params.category,
      },
    });

    return data;
  }

  public async get(
    id: number,
    params: OrderFetchAllPayloadDTO
  ): Promise<order | null> {
    const order = await this.client.order.findFirst({
      where: { id },
      include: {
        category: params.category,
      },
    });
    return order;
  }

  public async getBySlug(
    slug: string,
    params: OrderFetchAllPayloadDTO
  ): Promise<order | null> {
    const order = await this.client.order.findFirst({
      where: { slug },
      include: {
        category: params.category,
      },
    });
    return order;
  }

  public async save(data: any): Promise<order> {
    const order = await this.client.order.create({
      include: {
        category: true,
      },
      data,
    });

    return order;
  }

  public async update(id: number, data: Object): Promise<order> {
    const order = await this.client.order.update({
      where: { id },
      include: {
        category: true,
      },
      data,
    });

    return order;
  }

  public async delete(id: number): Promise<order> {
    const order = await this.client.order.delete({
      where: { id },
    });

    return order;
  }
}
