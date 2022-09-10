import { PrismaClient } from '@prisma/client'
import Email_TemplateRepository from './email_template-repository'

export default class email_TemplateService {
  private readonly email_TemplateRepository: Email_TemplateRepository 

  constructor(public prismaClient: PrismaClient) {
    this.email_TemplateRepository = new Email_TemplateRepository(prismaClient)
  }

  async fetchAll() {
    const email_Templates = await this.email_TemplateRepository.all()
    return { email_Templates }
  }

  async fetchById(id: number) {
    const email_template = await this.email_TemplateRepository.get(id)
    return { email_template }
  }

  async store(payload: Object) {
    const email_template = await this.email_TemplateRepository.save(payload)
    return { email_template }
  }

  async update(id: number, payload: Object) {
    const email_template = await this.email_TemplateRepository.update(id, payload)
    return { email_template }
  }

  async destroy(id: number) {
    const email_template = await this.email_TemplateRepository.delete(id)
    return { email_template }
  }
}
