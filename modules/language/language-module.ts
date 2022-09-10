import LanguageRouter from './language-router'
import { Module } from "reboot-solutions-cms";
import { PrismaClient } from '@prisma/client'

export default class LanguageModule implements Module {
  public readonly moduleName: string
  public readonly router: LanguageRouter
  public isPublic: boolean

  constructor(moduleName: string, isPublic: boolean, prismaClient: PrismaClient) {
    this.moduleName = moduleName
    this.isPublic = isPublic

    this.router = new LanguageRouter(prismaClient)
    this.loadRoutes()
  }

  private loadRoutes() {
    this.router.index().show().store().update().delete()
  }
}
