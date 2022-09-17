import { client } from "@prisma/client";

// Fetch All DTOs
export interface ClientFetchAllPayloadDTO {
  order: boolean;
}
export interface ClientFetchAllResponseDTO {
  clients: Array<client>;
}

// Fetch By ID DTOs
export interface ClientFetchOnePayloadDTO {
  order: boolean;
}
export interface ClientFetchOneResponseDTO {
  client: client | null;
}

// Save DTOs
export interface ClientSavePayloadDTO {
  name: string;
  identification?: string;
  telephone?: string;
  address?: string;
}
export interface ClientSaveResponseDTO {
  client: client;
}

// Update DTOs
export interface ClientUpdatePayloadDTO {
  name?: string;
  identification?: string;
  telephone?: string;
  address?: string;
}
export interface ClientUpdateResponseDTO {
  client: client;
}

// Destroy DTOs
export interface ClientDestroyPayloadDTO { }
export interface ClientDestroyResponseDTO {
  client: client;
}
