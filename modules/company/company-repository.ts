import { PrismaClient, company } from "@prisma/client";
import { CompanyFetchAllPayloadDTO } from "./company-interfaces";

export default class companyRepository {
  constructor(private readonly client: PrismaClient) { }


  public async all(params: CompanyFetchAllPayloadDTO): Promise<Array<company>> {
    const data = await this.client.company.findMany({
      include: {
        category: params.category,
      },
    });

    return data;
  }

  public async get(
    id: number,
    params: CompanyFetchAllPayloadDTO
  ): Promise<company | null> {
    const company = await this.client.company.findFirst({
      where: { id },
      include: {
        category: params.category,
      },
    });
    return company;
  }

  public async getBySlug(
    slug: string,
    params: CompanyFetchAllPayloadDTO
  ): Promise<company | null> {
    const company = await this.client.company.findFirst({
      where: { slug },
      include: {
        category: params.category,
      },
    });
    return company;
  }




  public async save(data: any): Promise<company> {
    const company = await this.client.company.create({
      include: {
        category: true,
      },
      data,
    });

    return company;
  }

  public async update(id: number, data: Object): Promise<company> {
    const company = await this.client.company.update({
      where: { id },
      include: {
        category: true,
      },
      data,
    });

    return company;
  }

  public async delete(id: number): Promise<company> {
    const company = await this.client.company.delete({
      where: { id },
    });

    return company;
  }
}
