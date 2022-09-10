import { PrismaClient, user } from "@prisma/client";
import { UserFetchPayload, UserUpdatePayload } from "./user-interfaces";

export default class UserRepository {
  constructor(private readonly client: PrismaClient) {}

  public all(params: UserFetchPayload): Promise<Array<user>> {
    return this.client.user.findMany({
      include: {
        role: params.role, 
      },
    });
  }

  public get(id: number, params: UserFetchPayload): Promise<user | null> {
    return this.client.user.findFirst({
      where: { id },
      include: {
        role: params.role, 
      },
    });
  }

  public getByEmail(email: string): Promise<user | null> {
    return this.client.user.findFirst({
      where: { email },
    });
  }

  public update(id: number, data: UserUpdatePayload): Promise<user> {
    return this.client.user.update({
      where: { id },
      data,
    });
  }

  public delete(id: number): Promise<user> {
    return this.client.user.delete({
      where: { id },
    });
  }
}
