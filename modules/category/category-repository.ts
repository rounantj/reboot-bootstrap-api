import { PrismaClient, category } from "@prisma/client";

export default class categoryRepository {
  constructor(private readonly client: PrismaClient) {}

  public async all(): Promise<Array<category>> {
    // TODO: transform word in plural with irregular to0
    const data = await this.client.category.findMany({});

    return data;
  }

  public async get(id: number): Promise<category | null> {
    const category = await this.client.category.findFirst({
      where: { id },
    });
    return category;
  }

  public async getBySlug(slug: string): Promise<category | null> {
    const category = await this.client.category.findFirst({
      where: { slug },
    });
    return category;
  }

  public async save(data: any): Promise<category> {
    // TODO: change any to properly interface
    const category = await this.client.category.create({
      data,
    });

    return category;
  }

  public async update(id: number, data: Object): Promise<category> {
    const category = await this.client.category.update({
      where: { id },
      data,
    });

    return category;
  }

  public async delete(id: number): Promise<category> {
    const category = await this.client.category.delete({
      where: { id },
    });

    return category;
  }
}
