import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { onError, onSuccess } from 'reboot-solutions-cms'
import LanguageService from './language-service'

export default class LanguageController {
  private readonly service: LanguageService 

  constructor(public prismaClient: PrismaClient) {
    this.service = new LanguageService(prismaClient)
  }

  public async index(request: Request, response: Response) {
    try {
      const languages = await this.service.fetchAll()

      return onSuccess(response, 200, languages)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const languageId = parseInt(request.params.id)
      const language = await this.service.fetchById(languageId)

      return onSuccess(response, 200, language)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const language = await this.service.store(request.body)
      
      return onSuccess(response, 200, language)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const languageId = parseInt(request.params.id)
      const language = await this.service.update(languageId, request.body)
      
      return onSuccess(response, 200, language)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const languageId = parseInt(request.params.id)
      const language = await this.service.destroy(languageId)

      return onSuccess(response, 200, language)
    } catch (error: any) {
      return onError(response, error)
    }
  }
}
