import { PrismaClient, language } from '@prisma/client'

export default class languageRepository {
  constructor(private readonly client: PrismaClient) {}

  public async all(): Promise<Array<language>> {
    // TODO: transform word in plural with irregular to0
    const data = await this.client.language.findMany({
    })

    return data
  }

  public async get(id: number): Promise<language | null> {
    const language = await this.client.language.findFirst({
      where: { id },
    })
    return language
  }

  public async save(data: any): Promise<language> { // TODO: change any to properly interface 
    const language = await this.client.language.create({
      data,
    })

    return language
  }

  public async update(id: number, data: Object): Promise<language> {
    const language = await this.client.language.update({
      where: { id },
      data,
    })

    return language
  }

  public async delete(id: number): Promise<language> {
    const language = await this.client.language.delete({
      where: { id },
    })

    return language
  }
}
