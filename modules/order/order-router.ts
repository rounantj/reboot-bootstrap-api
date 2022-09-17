import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import OrRderController from "./order-controller";
import { AppRouter } from "reboot-solutions-cms";
import { resourcePermission } from "../../middlewares/resourcePermission";
import { modules } from "../../helpers/modules";
import { permissions } from "../../helpers/permissions";
export default class ProductRouter implements AppRouter {
  public readonly router: Router = Router();
  private readonly controller: OrRderController;

  constructor(public prismaClient: PrismaClient) {
    this.controller = new OrRderController(prismaClient);
  }

  public index() {
    this.router.get(
      "/",
      resourcePermission(`${permissions.view} ${modules.order}`),
      (request: Request, response: Response) =>
        this.controller.index(request, response)
    );
    return this;
  }

  public show() {
    this.router.get(
      "/id/:id",
      resourcePermission(`${permissions.view} ${modules.order}`),
      async (request: Request, response: Response) => {
        this.controller.show(request, response);
      }
    );
    return this;
  }


  public store() {
    this.router.post(
      "/",
      resourcePermission(`${permissions.create} ${modules.order}`),
      async (request: Request, response: Response) => {
        console.log('começo', request.body)
        this.controller.store(request, response);
      }
    );
    return this;
  }

  public update() {
    this.router.patch(
      "/:id",
      resourcePermission(`${permissions.update} ${modules.order}`),
      async (request: Request, response: Response) => {
        this.controller.update(request, response);
      }
    );
    return this;
  }
  public delete() {
    this.router.delete(
      "/:id",
      resourcePermission(`${permissions.destroy} ${modules.order}`),
      async (request: Request, response: Response) => {
        this.controller.destroy(request, response);
      }
    );
    return this;
  }
}
