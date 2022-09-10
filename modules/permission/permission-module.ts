import PermissionRouter from "./permission-router";
import { Module } from "reboot-solutions-cms";
import { PrismaClient } from "@prisma/client";

export default class PermissionModule implements Module {
  public readonly moduleName: string;
  public readonly router: PermissionRouter;
  public isPublic: boolean;

  constructor(
    moduleName: string,
    isPublic: boolean,
    prismaClient: PrismaClient
  ) {
    this.moduleName = moduleName;
    this.isPublic = isPublic;

    this.router = new PermissionRouter(prismaClient);
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.index().show().delete();
  }
}
