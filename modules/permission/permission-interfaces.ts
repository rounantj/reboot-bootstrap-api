import { permission } from "@prisma/client";

// Fetch All DTOs
export interface PermissionFetchPayloadDTO {
  role: boolean;
}
export interface PermissionFetchAllResponseDTO {
  permission: Array<permission>;
}

// Fetch By ID DTOs
export interface PermissionFetchByIdResponseDTO {
  permission: permission;
}

// Destroy DTOs
export interface PermissionDestroyResponseDTO {
  permission: permission;
}
