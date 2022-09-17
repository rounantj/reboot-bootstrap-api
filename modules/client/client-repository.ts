import { PrismaClient, client } from "@prisma/client";
import { ClientFetchAllPayloadDTO } from "./client-interfaces";

export default class clientRepository {
  constructor(private readonly client: PrismaClient) { }


  public async all(params: ClientFetchAllPayloadDTO): Promise<Array<client>> {
    const data = await this.client.client.findMany({
      include: {
        category: params.category,
      },
    });

    return data;
  }

  public async get(
    id: number,
    params: ClientFetchAllPayloadDTO
  ): Promise<client | null> {
    const client = await this.client.client.findFirst({
      where: { id },
      include: {
        category: params.category,
      },
    });
    return client;
  }

  public async getBySlug(
    slug: string,
    params: ClientFetchAllPayloadDTO
  ): Promise<client | null> {
    const client = await this.client.client.findFirst({
      where: { slug },
      include: {
        category: params.category,
      },
    });
    return client;
  }

  public async save(data: any): Promise<client> {
    const client = await this.client.client.create({
      include: {
        category: true,
      },
      data,
    });

    return client;
  }

  public async update(id: number, data: Object): Promise<client> {
    const client = await this.client.client.update({
      where: { id },
      include: {
        category: true,
      },
      data,
    });

    return client;
  }

  public async delete(id: number): Promise<client> {
    const client = await this.client.client.delete({
      where: { id },
    });

    return client;
  }
}
