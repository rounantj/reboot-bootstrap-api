import { language } from '@prisma/client'

// Fetch All DTOs
export interface LanguageFetchAllPayloadDTO {

}
export interface LanguageFetchAllResponseDTO {
  language: Array<language>
}

// Fetch By ID DTOs
export interface LanguageFetchByIdPayloadDTO {

}
export interface LanguageFetchByIdResponseDTO {
  language: language
}

// Update DTOs
export interface LanguageUpdatePayloadDTO {

}
export interface LanguageUpdateResponseDTO {
  language: language
}

// Destroy DTOs
export interface LanguageDestroyPayloadDTO {

}
export interface LanguageDestroyResponseDTO {
  language: language
}
