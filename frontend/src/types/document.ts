import type { DocumentCategory } from './documentCategory'

export type Document = {
  id: string
  userId: string
  file?: File
  name: string
  category: DocumentCategory
  uploadedAt: string

  isShared?: boolean
  isTrashed?: boolean
  trashed?: string
}