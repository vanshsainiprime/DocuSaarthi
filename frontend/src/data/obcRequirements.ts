import type { Requirement } from '../types/requirement'

export const obcRequirements: {
  bonafide: Requirement[]
  migration: Requirement[]
} = {
  bonafide: [
    {
      name: 'Residence Proof',
      description:
        'Proof of residence for the beneficiary, father, and mother.',
      category: 'Address Proof',
      status: 'NOT CHECKED',
    },

    {
      name: 'Identity',
      description:
        'School or Birth Certificate of the beneficiary.',
      category: 'Education Document',
      status: 'NOT CHECKED',
    },

    {
      name: 'Caste Verification',
      description:
        'Previous caste certificate of the beneficiary (if applicable) and the caste certificate of the father.',
      category: 'Other',
      status: 'NOT CHECKED',
    },

    {
      name: 'Affidavit',
      description:
        'A sworn affidavit.',
      category: 'Other',
      status: 'NOT CHECKED',
    },

    {
      name: 'Income Proof',
      description:
        'Documentation showing family income from all sources.',
      category: 'Income Certificate',
      status: 'NOT CHECKED',
    },

    {
      name: 'Additional Verification',
      description:
        'If no previous OBC certificate exists, caste verification by two Gazetted Officers with their ID cards, plus residence proof of the father or grandfather prior to 08.09.1993.',
      category: 'Other',
      status: 'NOT CHECKED',
    },
  ],

  migration: [
    {
      name: 'Origin Certificate',
      description:
        "OBC/BC certificate of the father issued by the prescribed authority of the state of origin. If unavailable, the caste must be verified by two Gazetted Officers.",
      category: 'Other',
      status: 'NOT CHECKED',
    },

    {
      name: 'Residence',
      description:
        'Present residence proof in Chandigarh, and proof of residence prior to 13.08.1993, such as a Ration Card or House Allotment Letter.',
      category: 'Address Proof',
      status: 'NOT CHECKED',
    },

    {
      name: 'Income Limit',
      description:
        'Family income must not exceed ₹6.00 lakhs from all sources within and outside Chandigarh.',
      category: 'Income Certificate',
      status: 'NOT CHECKED',
    },

    {
      name: 'Identity',
      description:
        'School or Birth Certificate of the child.',
      category: 'Education Document',
      status: 'NOT CHECKED',
    },
  ],
}