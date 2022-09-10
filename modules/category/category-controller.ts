import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { onError, onSuccess } from "reboot-solutions-cms";
import CategoryService from "./category-service";

export default class CategoryController {
  private readonly service: CategoryService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new CategoryService(prismaClient);
  }

  public async index(request: Request, response: Response) {
    try {
      const categorys = await this.service.fetchAll();

      return onSuccess(response, 200, categorys);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const categoryId = parseInt(request.params.id);
      const category = await this.service.fetchById(categoryId);

      return onSuccess(response, 200, category);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async showBySlug(request: Request, response: Response) {
    try {
      const category = await this.service.fetchBySlug(request.params.slug);

      return onSuccess(response, 200, category);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const category = await this.service.store(request.body);

      return onSuccess(response, 200, category);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const categoryId = parseInt(request.params.id);
      const category = await this.service.update(categoryId, request.body);

      return onSuccess(response, 200, category);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const categoryId = parseInt(request.params.id);
      const category = await this.service.destroy(categoryId);

      return onSuccess(response, 200, category);
    } catch (error: any) {
      return onError(response, error);
    }
  }
}
