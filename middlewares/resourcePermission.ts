import { PrismaClient, user } from "@prisma/client";
import { ForbiddenError, onError } from "reboot-solutions-cms";
import { NextFunction, Response } from "express";
import PermissionRepository from "../modules/permission/permission-repository";

export function resourcePermission(resource: string) {
  return async (request: any, response: Response, next: NextFunction) => {
    try {
      const permissionRepository = new PermissionRepository(new PrismaClient());
      const { roleId }: user = request.user;
      const permission = await permissionRepository.getByName(resource, {
        role: false,
      });
      if (permission && roleId) {
        const rolePermission = await permissionRepository.getRolePermission(
          roleId,
          permission.id
        );

        if (rolePermission) {
          next();
        } else {
          throw new ForbiddenError(
            "Você não tem permissão para acessar esse recurso"
          );
        }
      } else {
        throw new ForbiddenError(
          "Você não tem permissão para acessar esse recurso"
        );
      }
    } catch (error: any) {
      return onError(response, error);
    }
  };
}
