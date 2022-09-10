import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  ForbiddenError,
  NotFoundError,
  onError,
  onSuccess,
} from "reboot-solutions-cms";
import UserService from "./user-service";
import {
  UserApproveResponseDTO,
  UserFetchAllResponseDTO,
  UserResponseOneDTO,
} from "./user-interfaces";

export default class UserController {
  private readonly service: UserService;

  constructor(public prismaClient: PrismaClient) {
    this.service = new UserService(prismaClient);
  }

  public async index(request: Request, response: Response) {
    try {
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );
      const users = await this.service.fetchAll(params);
      if (!users) throw new NotFoundError("Nenhum usuário encontrado");

      const responseDTO: UserFetchAllResponseDTO = { users };

      return onSuccess(response, 200, responseDTO);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const params = this._verifyParamsRelations(
        request.query.includes?.toString()
      );

      const user = await this.service.fetchById(userId, params);
      if (!user) throw new NotFoundError("Usuário não encontrado");

      const { confirmationCode, password, ...responseUser } = user;
      const responseDTO: UserResponseOneDTO = { user: responseUser };

      return onSuccess(response, 200, responseDTO);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      // @ts-expect-error
      if (userId != request.user.id)
        throw new ForbiddenError("Erro ao autorizar");

      const user = await this.service.update(userId, request.body);
      if (!user) throw new NotFoundError("Usuário não encontrado");

      const { confirmationCode, password, ...responseUser } = user;
      const responseDTO: UserResponseOneDTO = { user: responseUser };

      return onSuccess(response, 200, responseDTO);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const user = await this.service.destroy(userId);
      if (!user) throw new NotFoundError("Usuário não encontrado");

      const { confirmationCode, password, ...responseUser } = user;
      const responseDTO: UserResponseOneDTO = { user: responseUser };

      return onSuccess(response, 200, responseDTO);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  public async approve(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const user = await this.service.update(userId, { status: "approved" });
      if (!user) throw new NotFoundError("Usuário não encontrado");

      const { confirmationCode, password, ...responseUser } = user;

      const responseDTO: UserApproveResponseDTO = { user: responseUser };

      return onSuccess(response, 200, responseDTO);
    } catch (error: any) {
      return onError(response, error);
    }
  }

  private _verifyParamsRelations(query: string | undefined) {
    const relations = query?.split(",");
    return {
      role: !relations || !relations.includes("role") ? false : true,
      city: !relations || !relations.includes("city") ? false : true,
      state: !relations || !relations.includes("state") ? false : true,
    };
  }
}
