import { user } from "@prisma/client";

// Fetch
export interface UserFetchPayload {
  role: boolean;
  city: boolean;
  state: boolean;
}
export interface UserResponseOneDTO {
  user: Omit<user, "password" | "confirmationCode">;
}

export interface UserFetchAllResponseDTO {
  users: Omit<user, "password" | "confirmationCode">[];
}

// Update
export interface UserUpdatePayload {
  name?: string; 
  status?: string;
  roleId?: number;
  activatedAt?: Date;
}

export interface UserApproveResponseDTO {
  user: Omit<user, "password" | "confirmationCode">;
}
