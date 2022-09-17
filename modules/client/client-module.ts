import ClientRouter from "./client-router";
import { Module } from "reboot-solutions-cms";
import { PrismaClient } from "@prisma/client";

export default class ClientModule implements Module {
  public readonly moduleName: string;
  public readonly router: ClientRouter;
  public isPublic: boolean;

  constructor(
    moduleName: string,
    isPublic: boolean,
    prismaClient: PrismaClient
  ) {
    this.moduleName = moduleName;
    this.isPublic = isPublic;

    this.router = new ClientRouter(prismaClient);
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.index().show().showBySlug().store().update().delete();
  }
}
