export type RequirementStatus =
  | 'AVAILABLE'
  | 'MISSING'
  | 'NEEDS REVIEW'
  | 'NOT CHECKED'

export type Requirement = {
  name: string
  description: string
  category: string
  status: RequirementStatus
}