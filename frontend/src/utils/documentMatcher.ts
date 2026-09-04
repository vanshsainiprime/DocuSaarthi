import type { Document } from '../types/document'
import type {
  Requirement,
  RequirementStatus,
} from '../types/requirement'

export function matchRequirement(
  requirement: Requirement,
  documents: Document[],
): RequirementStatus {

  const matchingDocument =
    documents.some(
      (document) =>
        document.category === requirement.category,
    )

  if (!matchingDocument) {
    return 'MISSING'
  }

  if (requirement.category === 'Other') {
    return 'NEEDS REVIEW'
  }

  return 'AVAILABLE'
}