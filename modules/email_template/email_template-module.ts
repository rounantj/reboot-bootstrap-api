import Email_TemplateRouter from './email_template-router'
import { Module } from "reboot-solutions-cms";
import { PrismaClient } from '@prisma/client'

export default class Email_TemplateModule implements Module {
  public readonly moduleName: string
  public readonly router: Email_TemplateRouter
  public isPublic: boolean

  constructor(moduleName: string, isPublic: boolean, prismaClient: PrismaClient) {
    this.moduleName = moduleName
    this.isPublic = isPublic

    this.router = new Email_TemplateRouter(prismaClient)
    this.loadRoutes()
  }

  private loadRoutes() {
    this.router.index().show().store().update().delete().document().sendMail() 
  }
}
