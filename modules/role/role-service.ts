import { PrismaClient } from "@prisma/client";
import { roles } from "../../helpers/roles";
import { RoleBatchPayloadDTO, RoleFetchPayloadDTO } from "./role-interfaces";
import RoleRepository from "./role-repository";

export default class roleService {
  private readonly roleRepository: RoleRepository;

  constructor(public prismaClient: PrismaClient) {
    this.roleRepository = new RoleRepository(prismaClient);
  }

  async fetchAll(params: RoleFetchPayloadDTO) {
    const roles = await this.roleRepository.all(params);
    return { roles };
  }

  async fetchById(id: number, params: RoleFetchPayloadDTO) {
    const role = await this.roleRepository.get(id, params);
    return { role };
  }

  async fetchDefaultUserRole() {
    const role = await this.roleRepository.getByName(roles.user);
    return { role };
  }

  async batchSave(payload: Array<RoleBatchPayloadDTO>) {
    const rolePermission = await this.roleRepository.batchSaveRolesPermissions(
      payload
    );
    return rolePermission.count;
  }

  async batchDestroy(payload: Array<RoleBatchPayloadDTO>) {
    const rolePermission =
      await this.roleRepository.batchDestroyRolesPermissions(payload);
    return rolePermission.count;
  }
}
