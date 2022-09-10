import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import UserController from "./user-controller";
import { AppRouter } from "reboot-solutions-cms";
import { verifyAdmin, verifySuperAdmin } from "../../middlewares/verifyAdmin";
import { resourcePermission } from "../../middlewares/resourcePermission";
import { modules } from "../../helpers/modules";
import { permissions } from "../../helpers/permissions";

export default class UserRouter implements AppRouter {
  public readonly router: Router = Router();
  private readonly controller: UserController;

  constructor(public prismaClient: PrismaClient) {
    this.controller = new UserController(prismaClient);
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

  public update() {
    this.router.patch("/:id", (request: Request, response: Response) => {
      this.controller.update(request, response);
    });
    return this;
  }

  public delete() {
    this.router.delete(
      "/:id",
      verifySuperAdmin,
      (request: Request, response: Response) => {
        this.controller.destroy(request, response);
      }
    );
    return this;
  }

  public approve() {
    this.router.patch(
      "/approve/:id",
      verifyAdmin,
      (request: Request, response: Response) => {
        this.controller.approve(request, response);
      }
    );
    return this;
  }
}
