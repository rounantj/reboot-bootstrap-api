import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import RoleController from "./role-controller";
import { AppRouter } from "reboot-solutions-cms";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
import { verifyToken } from "../../middlewares/verifyToken";
export default class RoleRouter implements AppRouter {
  public readonly router: Router = Router();
  private readonly controller: RoleController;

  constructor(public prismaClient: PrismaClient) {
    this.controller = new RoleController(prismaClient);
  }

  public index() {
    this.router.get(
      "/",
      verifyToken,
      verifyAdmin,
      (request: Request, response: Response) =>
        this.controller.index(request, response)
    );
    return this;
  }

  public show() {
    this.router.get(
      "/:id",
      verifyToken,
      verifyAdmin,
      async (request: Request, response: Response) => {
        this.controller.show(request, response);
      }
    );
    return this;
  }

  public showDefaultRoleUser() {
    this.router.get(
      "/default",
      async (request: Request, response: Response) => {
        this.controller.showDefaultUserRole(request, response);
      }
    );
    return this;
  }

  public batchSave() {
    this.router.post(
      "/batch",
      verifyToken,
      verifyAdmin,
      async (request: Request, response: Response) => {
        this.controller.batchSave(request, response);
      }
    );
    return this;
  }

  public batchDestroy() {
    this.router.delete(
      "/batch",
      verifyToken,
      verifyAdmin,
      async (request: Request, response: Response) => {
        this.controller.batchDestroy(request, response);
      }
    );
    return this;
  }
}
