import { order, product } from "@prisma/client";

// Fetch All DTOs
export interface OrderFetchAllPayloadDTO {
  user: boolean;
  client: boolean;
}
export interface OrderFetchAllResponseDTO {
  order: Array<order>;
}

// Fetch By ID DTOs
export interface OrderFetchOnePayloadDTO {
  user: boolean;
  client: boolean;
}
export interface OrderFetchOneResponseDTO {
  order: order | null;
}

// Save DTOs
export interface OrderSavePayloadDTO {
  name: string;
  slug: string;
  clientId: number;
  userId: number;
  discount?: number;
  products: product[]
}
export interface OrderSaveResponseDTO {
  order: order;
}

// Update DTOs
export interface OrderUpdatePayloadDTO {
  name?: string;
  slug?: string;
  clientId?: number;
  userId?: number;
  discount?: number;
  products?: product[]
}
export interface OrderUpdateResponseDTO {
  order: order;
}

// Destroy DTOs
export interface OrderDestroyPayloadDTO { }
export interface OrderDestroyResponseDTO {
  order: order;
}
