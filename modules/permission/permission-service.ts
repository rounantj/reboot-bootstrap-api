import { PrismaClient } from "@prisma/client";
import { PermissionFetchPayloadDTO } from "./permission-interfaces";
import PermissionRepository from "./permission-repository";

export default class permissionService {
  private readonly permissionRepository: PermissionRepository;

  constructor(public prismaClient: PrismaClient) {
    this.permissionRepository = new PermissionRepository(prismaClient);
  }

  async fetchAll(params: PermissionFetchPayloadDTO) {
    const permissions = await this.permissionRepository.all(params);
    return { permissions };
  }

  async fetchById(id: number, params: PermissionFetchPayloadDTO) {
    const permission = await this.permissionRepository.get(id, params);
    return { permission };
  }

  async destroy(id: number) {
    const permission = await this.permissionRepository.delete(id);
    return { permission };
  }
}
