export type ChandigarhService = {
  id: string
  name: string
  description: string
  requirementCount: number
  path: string
}

export const chandigarhServices: ChandigarhService[] = [
  {
    id: 'obc-certificate',
    name: 'OBC Certificate',
    description:
      'Prepare documents for an OBC certificate in Chandigarh.',
    requirementCount: 6,
    path: '/services/obc-certificate',
  },
  {
    id: 'income-certificate',
    name: 'Income Certificate',
    description:
      'Prepare documents for an Income Certificate in Chandigarh.',
    requirementCount: 3,
    path: '/services/income-certificate/requirements',
  },
  {
    id: 'residence-certificate',
    name: 'Residence Certificate',
    description:
      'Prepare documents for a Residence Certificate in Chandigarh.',
    requirementCount: 2,
    path: '/services/residence-certificate/requirements',
  },
  {
    id: 'caste-certificate',
    name: 'Caste Certificate',
    description:
      'Prepare documents for a Caste Certificate in Chandigarh.',
    requirementCount: 0,
    path: '/services/caste-certificate/requirements',
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    description:
      'Access birth certificate services in Chandigarh.',
    requirementCount: 0,
    path: '/services/birth-certificate/requirements',
  },
  {
    id: 'death-certificate',
    name: 'Death Certificate',
    description:
      'Access death certificate services in Chandigarh.',
    requirementCount: 0,
    path: '/services/death-certificate/requirements',
  },
  {
    id: 'marriage-certificate',
    name: 'Marriage Certificate',
    description:
      'Access marriage registration services in Chandigarh.',
    requirementCount: 0,
    path: '/services/marriage-certificate/requirements',
  },
]