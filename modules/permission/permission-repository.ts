import { PrismaClient, permission, role_permission } from "@prisma/client";
import { PermissionFetchPayloadDTO } from "./permission-interfaces";
export default class PermissionRepository {
  constructor(private readonly client: PrismaClient) {}

  public roleOptions = {
    include: {
      role: true,
    },
  };

  public async all(
    params: PermissionFetchPayloadDTO
  ): Promise<Array<permission>> {
    // TODO: transform word in plural with irregular to
    const data = await this.client.permission.findMany({
      include: {
        roles: params.role ? this.roleOptions : false,
      },
    });

    return data;
  }

  public async get(
    id: number,
    params: PermissionFetchPayloadDTO
  ): Promise<permission | null> {
    const permission = await this.client.permission.findFirst({
      where: { id },
      include: {
        roles: params.role ? this.roleOptions : false,
      },
    });
    return permission;
  }

  public async getByName(
    name: string,
    params: PermissionFetchPayloadDTO
  ): Promise<permission | null> {
    const permission = await this.client.permission.findFirst({
      where: { name },
      include: {
        roles: params.role ? this.roleOptions : false,
      },
    });
    return permission;
  }

  public async getRolePermission(
    roleId: number,
    permissionId: number
  ): Promise<role_permission | null> {
    const rolePermission = await this.client.role_permission.findFirst({
      where: { roleId, permissionId },
    });

    return rolePermission;
  }

  public async delete(id: number): Promise<permission> {
    const permission = await this.client.permission.delete({
      where: { id },
    });

    return permission;
  }
}
