import { company } from "@prisma/client";

// Fetch All DTOs
export interface CompanyFetchAllPayloadDTO {
  category: boolean;

}
export interface CompanyFetchAllResponseDTO {
  company: Array<company>;
}

// Fetch By ID DTOs
export interface CompanyFetchOnePayloadDTO {
  category: boolean;

}
export interface CompanyFetchOneResponseDTO {
  company: company | null;
}

// Save DTOs
export interface CompanySavePayloadDTO {
  name: string;
  slug: string;
  cnpj: string;

}
export interface CompanySaveResponseDTO {
  company: company;
}

// Update DTOs
export interface CompanyUpdatePayloadDTO {
  name?: string;
  slug?: string;
  cnpj?: string;
}
export interface CompanyUpdateResponseDTO {
  company: company;
}

// Destroy DTOs
export interface CompanyDestroyPayloadDTO { }
export interface CompanyDestroyResponseDTO {
  company: company;
}
