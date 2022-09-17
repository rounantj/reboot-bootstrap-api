import ProductRouter from "./product-router";
import { Module } from "reboot-solutions-cms";
import { PrismaClient } from "@prisma/client";

export default class ProductModule implements Module {
  public readonly moduleName: string;
  public readonly router: ProductRouter;
  public isPublic: boolean;

  constructor(
    moduleName: string,
    isPublic: boolean,
    prismaClient: PrismaClient
  ) {
    this.moduleName = moduleName;
    this.isPublic = isPublic;

    this.router = new ProductRouter(prismaClient);
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.index().show().showBySlug().showByEan().store().update().delete().upload();
  }
}
