import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import PermissionController from "./permission-controller";
import { AppRouter } from "reboot-solutions-cms";
import { verifyAdmin, verifySuperAdmin } from "../../middlewares/verifyAdmin";
export default class PermissionRouter implements AppRouter {
  public readonly router: Router = Router();
  private readonly controller: PermissionController;

  constructor(public prismaClient: PrismaClient) {
    this.controller = new PermissionController(prismaClient);
  }

  public index() {
    this.router.get("/", verifyAdmin, (request: Request, response: Response) =>
      this.controller.index(request, response)
    );
    return this;
  }

  public show() {
    this.router.get(
      "/:id",
      verifyAdmin,
      async (request: Request, response: Response) => {
        this.controller.show(request, response);
      }
    );
    return this;
  }

  public delete() {
    this.router.delete(
      "/:id",
      verifySuperAdmin,
      async (request: Request, response: Response) => {
        this.controller.destroy(request, response);
      }
    );
    return this;
  }
}
