import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "reboot-solutions-cms";
import { UserFetchPayload, UserUpdatePayload } from "./user-interfaces";
import UserRepository from "./user-repository";

export default class UserService {
  private readonly userRepository: UserRepository;

  constructor(public prismaClient: PrismaClient) {
    this.userRepository = new UserRepository(prismaClient);
  }

  async fetchAll(params: UserFetchPayload) {
    const users = await this.userRepository.all(params);
    if (!users || users.length == 0)
      throw new NotFoundError("Nenhum usuário foi encontrado!");

    const mappedUsers = users.map((user) => {
      const { password, confirmationCode, ...responseUser } = user;
      return responseUser;
    });

    return mappedUsers;
  }

  async fetchById(id: number, params: UserFetchPayload) {
    const user = await this.userRepository.get(id, params);
    if (!user) throw new NotFoundError("Usuário não encontrado!");
    return user;
  }

  async update(id: number, payload: UserUpdatePayload) {
    const { status, roleId, activatedAt, ...bodyPayload } = payload;
    const user = await this.userRepository.update(id, bodyPayload);
    if (!user) throw new NotFoundError("Usuário não encontrado!");
    return user;
  }

  async destroy(id: number) {
    const user = await this.userRepository.delete(id);
    if (!user) throw new NotFoundError("Usuário não encontrado!");
    return user;
  }
}
