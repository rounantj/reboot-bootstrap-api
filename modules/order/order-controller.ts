import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { onError, onSuccess } from "reboot-solutions-cms";
import OrderService from "./order-service";

export default class ProductController {
  private readonly service: OrderService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new OrderService(prismaClient);
  }

  public async index(request: Request, response: Response) {
    try {

      const products = await this.service.fetchAll(request.body);

      return onSuccess(response, 200, products);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const orderId = parseInt(request.params.id);

      const order = await this.service.fetchById(orderId, request.body);

      return onSuccess(response, 200, order);
    } catch (error: any) {
      return onError(response, error);
    }
  }



  public async store(request: Request, response: Response) {
    try {
      const order = await this.service.store(request.body);

      return onSuccess(response, 200, order);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const orderId = parseInt(request.params.id);
      const order = await this.service.update(orderId, request.body);

      return onSuccess(response, 200, order);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const orderId = parseInt(request.params.id);
      const order = await this.service.destroy(orderId);

      return onSuccess(response, 200, order);
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
