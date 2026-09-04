import type { RequirementStatus } from '../types/requirement'

type Requirement = {
  name: string
  description: string
  status: RequirementStatus
}

export const panCardRequirements: Requirement[] = [
  {
    name: 'Proof of Identity',
    description:
      'Aadhaar Card, Voter ID, Passport, Driving License, Ration Card with photo, or an identity certificate signed by a Gazetted Officer, MLA, or MP.',
    status: 'NOT CHECKED',
  },

  {
    name: 'Proof of Address',
    description:
      'Aadhaar Card, Passport, Driving License, recent utility bills, Bank Account Statement, or Post Office Passbook.',
    status: 'NOT CHECKED',
  },

  {
    name: 'Proof of Date of Birth',
    description:
      'Birth Certificate, Matriculation Certificate, Passport, Driving License, or Domicile Certificate issued by the Government.',
    status: 'NOT CHECKED',
  },
]