import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { onError, onSuccess } from "reboot-solutions-cms";
import ProductService from "./product-service";

export default class ProductController {
  private readonly service: ProductService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new ProductService(prismaClient);
  }

  public async index(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );

      const products = await this.service.fetchAll(params);

      return onSuccess(response, 200, products);
    } catch (error: any) {
      return onError(response, error);
    }
  }



  public async upload(request: Request, response: Response, uploads: any) {
    try {
      const { file } = request
      return onSuccess(response, 200, { file });
    } catch (error: any) {
      return onError(response, error);
    }
  }





  public async show(request: Request, response: Response) {
    try {
      const productId = parseInt(request.params.id);
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const product = await this.service.fetchById(productId, params);

      return onSuccess(response, 200, product);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async showBySlug(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const product = await this.service.fetchBySlug(
        request.params.slug,
        params
      );

      return onSuccess(response, 200, product);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async showByEan(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const product = await this.service.fetchByEan(
        request.params.ean,
        params
      );

      return onSuccess(response, 200, product);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const product = await this.service.store(request.body);

      return onSuccess(response, 200, product);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const productId = parseInt(request.params.id);
      const product = await this.service.update(productId, request.body);

      return onSuccess(response, 200, product);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const productId = parseInt(request.params.id);
      const product = await this.service.destroy(productId);

      return onSuccess(response, 200, product);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  private _verifyParamsRelations(query: string | undefined) {
    const relations = query?.split(",");
    return {
      category: !relations || !relations.includes("category") ? false : true,
      analysis: !relations || !relations.includes("analysis") ? false : true,
    };
  }
}
