// Fetch All DTOs
export interface RoleFetchPayloadDTO {
  user: boolean;
  permission: boolean;
}

// Save and Update DTO
export interface RoleBatchPayloadDTO {
  roleId: number;
  permissionId: number;
}
