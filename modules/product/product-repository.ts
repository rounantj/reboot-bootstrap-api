import { PrismaClient, product } from "@prisma/client";
import { ProductFetchAllPayloadDTO } from "./product-interfaces";

export default class productRepository {
  constructor(private readonly client: PrismaClient) {}


  public async all(params: ProductFetchAllPayloadDTO): Promise<Array<product>> {
    const data = await this.client.product.findMany({
      include: {
        category: params.category,
      },
    });

    return data;
  }

  public async get(
    id: number,
    params: ProductFetchAllPayloadDTO
  ): Promise<product | null> {
    const product = await this.client.product.findFirst({
      where: { id },
      include: {
        category: params.category,
      },
    });
    return product;
  }

  public async getBySlug(
    slug: string,
    params: ProductFetchAllPayloadDTO
  ): Promise<product | null> {
    const product = await this.client.product.findFirst({
      where: { slug },
      include: {
        category: params.category,
      },
    });
    return product;
  }

  public async save(data: any): Promise<product> {
    const product = await this.client.product.create({
      include: {
        category: true,
      },
      data,
    });

    return product;
  }

  public async update(id: number, data: Object): Promise<product> {
    const product = await this.client.product.update({
      where: { id },
      include: {
        category: true,
      },
      data,
    });

    return product;
  }

  public async delete(id: number): Promise<product> {
    const product = await this.client.product.delete({
      where: { id },
    });

    return product;
  }
}
