import { product } from "@prisma/client";

// Fetch All DTOs
export interface ProductFetchAllPayloadDTO {
  category: boolean;
}
export interface ProductFetchAllResponseDTO {
  products: Array<product>;
}

// Fetch By ID DTOs
export interface ProductFetchOnePayloadDTO {
  category: boolean;
}
export interface ProductFetchOneResponseDTO {
  product: product | null;
}

// Save DTOs
export interface ProductSavePayloadDTO {
  name: string;
  slug: string;
  ean: string;
  lang: string;
  picture: string;
  status: number;
  value: number;
  estoque: number;
  categoryId: number;
}
export interface ProductSaveResponseDTO {
  product: product;
}

// Update DTOs
export interface ProductUpdatePayloadDTO {
  name?: string;
  slug?: string;
  ean?: string;
  lang?: string;
  picture?: string;
  status?: number;
  value?: number;
  estoque?: number;
  categoryId?: number;
}
export interface ProductUpdateResponseDTO {
  product: product;
}

// Destroy DTOs
export interface ProductDestroyPayloadDTO { }
export interface ProductDestroyResponseDTO {
  product: product;
}
