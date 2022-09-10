import { email_template } from '@prisma/client'

// Fetch All DTOs
export interface Email_TemplateFetchAllPayloadDTO {

}
export interface Email_TemplateFetchAllResponseDTO {
  email_template: Array<email_template>
}

// Fetch By ID DTOs
export interface Email_TemplateFetchByIdPayloadDTO {

}
export interface Email_TemplateFetchByIdResponseDTO {
  email_template: email_template
}

// Update DTOs
export interface Email_TemplateUpdatePayloadDTO {

}
export interface Email_TemplateUpdateResponseDTO {
  email_template: email_template
}

// Destroy DTOs
export interface Email_TemplateDestroyPayloadDTO {

}
export interface Email_TemplateDestroyResponseDTO {
  email_template: email_template
}

export interface IObjToPdf {
  columns: string[],
  values: Array<string[]>
}