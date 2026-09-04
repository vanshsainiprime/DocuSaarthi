import type { Requirement } from '../types/requirement'

export const chandigarhIncomeRequirements: Requirement[] = [
  {
    name: 'Application',
    description:
      'Application for issuance of an Income Certificate.',
    category: 'Other',
    status: 'NOT CHECKED',
  },
  {
    name: 'Income Proof',
    description:
      'Proof showing the applicant/family income.',
    category: 'Income Certificate',
    status: 'NOT CHECKED',
  },
  {
    name: 'Residence Proof',
    description:
      'Proof of residence.',
    category: 'Address Proof',
    status: 'NOT CHECKED',
  },
]