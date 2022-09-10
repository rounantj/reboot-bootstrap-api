import { PrismaClient, email_template } from '@prisma/client'

export default class email_TemplateRepository {
  constructor(private readonly client: PrismaClient) {}

  public async all(): Promise<Array<email_template>> {
    // TODO: transform word in plural with irregular to0
    const data = await this.client.email_template.findMany({
    })

    return data
  }

  public async get(id: number): Promise<email_template | null> {
    const email_template = await this.client.email_template.findFirst({
      where: { id },
    })
    return email_template
  }

  public async save(data: any): Promise<email_template> { // TODO: change any to properly interface 
    const email_template = await this.client.email_template.create({
      data,
    })

    return email_template
  }

  public async update(id: number, data: Object): Promise<email_template> {
    const email_template = await this.client.email_template.update({
      where: { id },
      data,
    })

    return email_template
  }

  public async delete(id: number): Promise<email_template> {
    const email_template = await this.client.email_template.delete({
      where: { id },
    })

    return email_template
  }
}
