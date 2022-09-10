import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { onError, onSuccess } from "reboot-solutions-cms";
import PermissionService from "./permission-service";

export default class PermissionController {
  private readonly service: PermissionService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new PermissionService(prismaClient);
  }

  public async index(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const permissions = await this.service.fetchAll(params);

      return onSuccess(response, 200, permissions);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const permissionId = parseInt(request.params.id);
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const permission = await this.service.fetchById(permissionId, params);

      return onSuccess(response, 200, permission);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const permissionId = parseInt(request.params.id);
      const permission = await this.service.destroy(permissionId);

      return onSuccess(response, 200, permission);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  private _verifyParamsRelations(query: string | undefined) {
    const relations = query?.split(",");
    return {
      role: !relations || !relations.includes("role") ? false : true,
    };
  }
}
