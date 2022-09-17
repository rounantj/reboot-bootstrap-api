import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import CompanyController from "./company-controller";
import { AppRouter } from "reboot-solutions-cms";
import { resourcePermission } from "../../middlewares/resourcePermission";
import { modules } from "../../helpers/modules";
import { permissions } from "../../helpers/permissions";
export default class ProductRouter implements AppRouter {
  public readonly router: Router = Router();
  private readonly controller: CompanyController;

  constructor(public prismaClient: PrismaClient) {
    this.controller = new CompanyController(prismaClient);
  }

  public index() {
    this.router.get(
      "/",
      resourcePermission(`${permissions.view} ${modules.company}`),
      (request: Request, response: Response) =>
        this.controller.index(request, response)
    );
    return this;
  }

  public show() {
    this.router.get(
      "/id/:id",
      resourcePermission(`${permissions.view} ${modules.company}`),
      async (request: Request, response: Response) => {
        this.controller.show(request, response);
      }
    );
    return this;
  }

  public showBySlug() {
    this.router.get(
      "/slug/:slug",
      resourcePermission(`${permissions.view} ${modules.company}`),
      async (request: Request, response: Response) => {
        this.controller.showBySlug(request, response);
      }
    );
    return this;
  }


  public store() {
    this.router.post(
      "/",
      resourcePermission(`${permissions.create} ${modules.company}`),
      async (request: Request, response: Response) => {
        this.controller.store(request, response);
      }
    );
    return this;
  }

  public update() {
    this.router.patch(
      "/:id",
      resourcePermission(`${permissions.update} ${modules.company}`),
      async (request: Request, response: Response) => {
        this.controller.update(request, response);
      }
    );
    return this;
  }
  public delete() {
    this.router.delete(
      "/:id",
      resourcePermission(`${permissions.destroy} ${modules.company}`),
      async (request: Request, response: Response) => {
        this.controller.destroy(request, response);
      }
    );
    return this;
  }
}
