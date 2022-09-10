import { PrismaClient, role } from "@prisma/client";
import { RoleBatchPayloadDTO, RoleFetchPayloadDTO } from "./role-interfaces";

export default class RoleRepository {
  constructor(private readonly client: PrismaClient) {}

  public permissionOptions = {
    include: {
      permission: true,
    },
  };

  public async all(params: RoleFetchPayloadDTO): Promise<Array<role>> {
    // TODO: transform word in plural with irregular to
    const data = await this.client.role.findMany({
      include: {
        user: params.user,
        permissions: params.permission ? this.permissionOptions : false,
      },
    });

    return data;
  }

  public async getByName(name: string): Promise<role | null> {
    const role = await this.client.role.findFirst({
      where: { name },
    });
    return role;
  }

  public async get(
    id: number,
    params: RoleFetchPayloadDTO
  ): Promise<role | null> {
    const role = await this.client.role.findFirst({
      where: { id },
      include: {
        user: params.user,
        permissions: params.permission ? this.permissionOptions : false,
      },
    });
    return role;
  }

  public async batchSaveRolesPermissions(
    payload: Array<RoleBatchPayloadDTO>
  ): Promise<{ count: number }> {
    const roles_permissions = await this.client.role_permission.createMany({
      data: payload,
    });

    return roles_permissions;
  }

  public async batchDestroyRolesPermissions(
    payload: Array<RoleBatchPayloadDTO>
  ): Promise<{ count: number }> {
    const roles_permissions = await this.client.role_permission.deleteMany({
      where: {
        roleId: {
          in: payload.map((rolePermission) => rolePermission.roleId),
        },
        permissionId: {
          in: payload.map((rolePermission) => rolePermission.permissionId),
        },
      },
    });

    return roles_permissions;
  }
}
