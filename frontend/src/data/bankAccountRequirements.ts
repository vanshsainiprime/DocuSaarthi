import type { RequirementStatus } from '../types/requirement'

type Requirement = {
  name: string
  description: string
  status: RequirementStatus
}

export const bankAccountRequirements: Requirement[] = [
  {
    name: 'Identity Proof',
    description:
      'Aadhaar Card, PAN Card, Passport, Voter ID, Driving License, or Government/Defense ID.',
    status: 'NOT CHECKED',
  },

  {
    name: 'Address Proof',
    description:
      'Utility bills, bank statements, ration card, or registered rent agreement.',
    status: 'NOT CHECKED',
  },

  {
    name: 'Business Documents',
    description:
      'For current accounts, additional proofs such as GST registration, partnership deeds, or board resolutions may be required.',
    status: 'NOT CHECKED',
  },
]