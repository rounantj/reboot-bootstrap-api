import { PrismaClient } from '@prisma/client'
import { Request, Response, Router } from 'express'
import LanguageController from './language-controller'
import { AppRouter } from 'reboot-solutions-cms'

export default class LanguageRouter implements AppRouter {
  public readonly router: Router = Router()
  private readonly controller: LanguageController 

  constructor(public prismaClient: PrismaClient) {
    this.controller = new LanguageController(prismaClient)
  }

  public index() {
    this.router.get('/', (request: Request, response: Response) =>
      this.controller.index(request, response)
    )
    return this
  }

  public show() {
    this.router.get('/:id', async (request: Request, response: Response) => {
      this.controller.show(request, response)
    })
    return this
  }

  public store() {
    this.router.post('/', async (request: Request, response: Response) => {
      this.controller.store(request, response)
    })
    return this
  }

  public update() {
    this.router.patch('/:id', async (request: Request, response: Response) => {
      this.controller.update(request, response)
    })
    return this
  }
  public delete() {
    this.router.delete('/:id', async (request: Request, response: Response) => {
      this.controller.destroy(request, response)
    })
    return this
  }
}
