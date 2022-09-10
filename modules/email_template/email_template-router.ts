import { PrismaClient } from '@prisma/client'
import { Request, Response, Router } from 'express'
import Email_TemplateController from './email_template-controller'
import { AppRouter } from 'reboot-solutions-cms'

export default class Email_TemplateRouter implements AppRouter {
  public readonly router: Router = Router()
  private readonly controller: Email_TemplateController 

  constructor(public prismaClient: PrismaClient) {
    this.controller = new Email_TemplateController(prismaClient)
  }

  public index() {
    this.router.get('/', (request: Request, response: Response) =>
      this.controller.index(request, response)
    )
    return this
  }
 

  public document(){
    this.router.get('/document/:id', async (request: Request, response: Response) => {
      this.controller.document(request, response)
      console.log(this)
    })
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

  public sendMail() {
    this.router.post('/send', async (request: Request, response: Response) => {
      await this.controller.mailSender(request, response)
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
