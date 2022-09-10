import { category } from '@prisma/client'

// Fetch All DTOs
export interface CategoryFetchAllPayloadDTO {

}
export interface CategoryFetchAllResponseDTO {
  category: Array<category>
}

// Fetch By ID DTOs
export interface CategoryFetchByIdPayloadDTO {

}
export interface CategoryFetchByIdResponseDTO {
  category: category
}

// Update DTOs
export interface CategoryUpdatePayloadDTO {

}
export interface CategoryUpdateResponseDTO {
  category: category
}

// Destroy DTOs
export interface CategoryDestroyPayloadDTO {

}
export interface CategoryDestroyResponseDTO {
  category: category
}
