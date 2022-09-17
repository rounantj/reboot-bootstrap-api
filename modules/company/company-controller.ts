import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { onError, onSuccess } from "reboot-solutions-cms";
import CompanyService from "./company-service";

export default class ProductController {
  private readonly service: CompanyService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new CompanyService(prismaClient);
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

  public async show(request: Request, response: Response) {
    try {
      const companyId = parseInt(request.params.id);
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const company = await this.service.fetchById(companyId, params);

      return onSuccess(response, 200, company);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async showBySlug(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const company = await this.service.fetchBySlug(
        request.params.slug,
        params
      );

      return onSuccess(response, 200, company);
    } catch (error: any) {
      return onError(response, error);
    }
  }




  public async store(request: Request, response: Response) {
    try {
      const company = await this.service.store(request.body);

      return onSuccess(response, 200, company);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const companyId = parseInt(request.params.id);
      const company = await this.service.update(companyId, request.body);

      return onSuccess(response, 200, company);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const companyId = parseInt(request.params.id);
      const company = await this.service.destroy(companyId);

      return onSuccess(response, 200, company);
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
