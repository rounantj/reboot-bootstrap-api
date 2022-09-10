import { PrismaClient } from '@prisma/client'
import LanguageRepository from './language-repository'

export default class languageService {
  private readonly languageRepository: LanguageRepository 

  constructor(public prismaClient: PrismaClient) {
    this.languageRepository = new LanguageRepository(prismaClient)
  }

  async fetchAll() {
    const languages = await this.languageRepository.all()
    return { languages }
  }

  async fetchById(id: number) {
    const language = await this.languageRepository.get(id)
    return { language }
  }

  async store(payload: Object) {
    const language = await this.languageRepository.save(payload)
    return { language }
  }

  async update(id: number, payload: Object) {
    const language = await this.languageRepository.update(id, payload)
    return { language }
  }

  async destroy(id: number) {
    const language = await this.languageRepository.delete(id)
    return { language }
  }
}
