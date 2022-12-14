import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import ProductController from "./product-controller";
import { AppRouter } from "reboot-solutions-cms";
import { resourcePermission } from "../../middlewares/resourcePermission";
import { modules } from "../../helpers/modules";
import { permissions } from "../../helpers/permissions";
import uploads from './multer'
import path from 'path'

export default class ProductRouter implements AppRouter {
  public readonly router: Router = Router();
  private readonly controller: ProductController;

  constructor(public prismaClient: PrismaClient) {
    this.controller = new ProductController(prismaClient);
  }



  public index() {
    this.router.get(
      "/",
      
      (request: Request, response: Response) =>
        this.controller.index(request, response)
    );
    return this;
  }


  public upload() {
    this.router.post(
      "/upload-image",
      // resourcePermission(`${permissions.view} ${modules.product}`), 
      uploads.single('avatar'),
      (request: Request, response: Response) =>
        this.controller.upload(request, response, uploads)
    );
    return this;
  }

  public show() {
    this.router.get(
      "/id/:id",
      
      async (request: Request, response: Response) => {
        this.controller.show(request, response);
      }
    );
    return this;
  }

  public showBySlug() {
    this.router.get(
      "/slug/:slug",
      
      async (request: Request, response: Response) => {
        this.controller.showBySlug(request, response);
      }
    );
    return this;
  }

  public showByEan() {
    this.router.get(
      "/ean/:ean",
      
      async (request: Request, response: Response) => {
        this.controller.showByEan(request, response);
      }
    );
    return this;
  }

  public store() {
    this.router.post(
      "/",
     
      async (request: Request, response: Response) => {
        this.controller.store(request, response);
      }
    );
    return this;
  }

  public update() {
    this.router.patch(
      "/:id",
      
      async (request: Request, response: Response) => {
        this.controller.update(request, response);
      }
    );
    return this;
  }
  public delete() {
    this.router.delete(
      "/:id",
      async (request: Request, response: Response) => {
        this.controller.destroy(request, response);
      }
    );
    return this;
  }
}
