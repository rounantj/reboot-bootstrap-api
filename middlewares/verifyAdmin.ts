import { PrismaClient, user } from "@prisma/client";
import { ForbiddenError, onError } from "reboot-solutions-cms";
import { NextFunction, Response } from "express";
import { roles } from "../helpers/roles";
import RoleRepository from "../modules/role/role-repository";

export async function verifyAdmin(
  request: any,
  response: Response,
  next: NextFunction
) {
  try {
    const roleRepository = new RoleRepository(new PrismaClient());
    const { roleId }: user = request.user;
    const role = await roleRepository.get(roleId, {
      user: false,
      permission: false,
    });

    if (role && (role.name == roles.admin || role.name == roles.superAdmin)) {
      next();
    } else {
      throw new ForbiddenError(
        "Você não tem permissão para acessar esse recurso"
      );
    }
  } catch (error: any) {
    return onError(response, error);
  }
}

export async function verifySuperAdmin(
  request: any,
  response: Response,
  next: NextFunction
) {
  try {
    const roleRepository = new RoleRepository(new PrismaClient());
    const { roleId }: user = request.user;
    const role = await roleRepository.get(roleId, {
      user: false,
      permission: false,
    });

    if (role && role.name == roles.superAdmin) {
      next();
    } else {
      throw new ForbiddenError(
        "Você não tem permissão para acessar esse recurso"
      );
    }
  } catch (error: any) {
    return onError(response, error);
  }
}
