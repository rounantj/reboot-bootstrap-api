import RoleRouter from "./role-router";
import { Module } from "reboot-solutions-cms";
import { PrismaClient } from "@prisma/client";

export default class RoleModule implements Module {
  public readonly moduleName: string;
  public readonly router: RoleRouter;
  public isPublic: boolean;

  constructor(
    moduleName: string,
    isPublic: boolean,
    prismaClient: PrismaClient
  ) {
    this.moduleName = moduleName;
    this.isPublic = isPublic;

    this.router = new RoleRouter(prismaClient);
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.showDefaultRoleUser().index().show().batchSave().batchDestroy();
  }
}
