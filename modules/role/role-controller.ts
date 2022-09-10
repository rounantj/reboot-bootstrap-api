import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { onError, onSuccess } from "reboot-solutions-cms";
import RoleService from "./role-service";

export default class RoleController {
  private readonly service: RoleService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new RoleService(prismaClient);
  }

  public async index(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const roles = await this.service.fetchAll(params);

      return onSuccess(response, 200, roles);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const roleId = parseInt(request.params.id);
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const role = await this.service.fetchById(roleId, params);

      return onSuccess(response, 200, role);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async showDefaultUserRole(request: Request, response: Response) {
    try {
      const role = await this.service.fetchDefaultUserRole();

      return onSuccess(response, 200, role);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async batchSave(request: Request, response: Response) {
    try {
      const rolePermissionCount = await this.service.batchSave(request.body);

      return onSuccess(response, 200, {
        message: `A operação registrou ${rolePermissionCount} permissão(ões) com sucesso!`,
      });
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async batchDestroy(request: Request, response: Response) {
    try {
      const rolePermissionCount = await this.service.batchDestroy(request.body);

      return onSuccess(response, 200, {
        message: `A operação excluiu ${rolePermissionCount} permissão(ões) com sucesso!`,
      });
    } catch (error: any) {
      return onError(response, error);
    }
  }

  private _verifyParamsRelations(query: string | undefined) {
    const relations = query?.split(",");
    return {
      user: !relations || !relations.includes("user") ? false : true,
      permission:
        !relations || !relations.includes("permission") ? false : true,
    };
  }
}
