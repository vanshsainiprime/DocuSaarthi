import './DocumentDictionary.css'
import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'

type DocumentDefinition = {
  id: string
  name: string
  description: string
  commonlyUsedFor: string[]
  issuer: string
}

const documents: DocumentDefinition[] = [
  {
    id: 'aadhaar',
    name: 'Aadhaar',
    description:
      'A government-issued identity document used for identity and address verification.',
    commonlyUsedFor: [
      'Identity verification',
      'Address verification',
      'Government services',
    ],
    issuer: 'Unique Identification Authority of India (UIDAI)',
  },

  {
    id: 'income-certificate',
    name: 'Income Certificate',
    description:
      'A document that verifies the income of an individual or family.',
    commonlyUsedFor: [
      'Scholarships',
      'Fee concessions',
      'Government schemes',
      'Income-based certificates',
    ],
    issuer: 'Relevant government authority',
  },
  {
    id: 'pan-card',
    name: 'PAN Card',
    description:
      'A document containing a Permanent Account Number used for identification in tax and certain financial matters.',
    commonlyUsedFor: [
      'Tax-related processes',
      'Banking',
      'Financial transactions',
      'Identity verification',
    ],
    issuer: 'Income Tax Department',
  },

  {
    id: 'obc-certificate',
    name: 'OBC Certificate',
    description:
      'A certificate used to establish that a person belongs to an Other Backward Class category under the applicable rules.',
    commonlyUsedFor: [
      'Reservations',
      'Scholarships',
      'Government schemes',
      'Educational applications',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'sc-certificate',
    name: 'SC Certificate',
    description:
      'A certificate used to establish that a person belongs to a Scheduled Caste category under the applicable rules.',
    commonlyUsedFor: [
      'Reservations',
      'Scholarships',
      'Government schemes',
      'Educational applications',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'st-certificate',
    name: 'ST Certificate',
    description:
      'A certificate used to establish that a person belongs to a Scheduled Tribe category under the applicable rules.',
    commonlyUsedFor: [
      'Reservations',
      'Scholarships',
      'Government schemes',
      'Educational applications',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'residence-certificate',
    name: 'Residence Certificate',
    description:
      'A certificate used to establish that a person resides in a particular area.',
    commonlyUsedFor: [
      'Government applications',
      'Certificates',
      'Government schemes',
      'Address-related requirements',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'domicile-certificate',
    name: 'Domicile Certificate',
    description:
      'A certificate used to establish a person’s domicile or residential status in a particular state or union territory.',
    commonlyUsedFor: [
      'Education',
      'Government jobs',
      'Reservations',
      'Government schemes',
    ],
    issuer: 'Relevant state or union territory authority',
  },

  {
    id: 'death-certificate',
    name: 'Death Certificate',
    description:
      'An official record that documents a person’s death.',
    commonlyUsedFor: [
      'Legal procedures',
      'Inheritance matters',
      'Pension-related processes',
      'Government records',
    ],
    issuer: 'Relevant death registration authority',
  },

  {
    id: 'marriage-certificate',
    name: 'Marriage Certificate',
    description:
      'An official document that records the registration of a marriage.',
    commonlyUsedFor: [
      'Legal proof of marriage',
      'Government applications',
      'Passport-related processes',
      'Legal procedures',
    ],
    issuer: 'Relevant marriage registration authority',
  },

  {
    id: 'legal-heir-certificate',
    name: 'Legal Heir Certificate',
    description:
      'A certificate identifying the legal heirs of a deceased person for applicable administrative purposes.',
    commonlyUsedFor: [
      'Property-related matters',
      'Pension claims',
      'Government procedures',
      'Administrative claims',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'solvency-certificate',
    name: 'Solvency Certificate',
    description:
      'A certificate concerning the financial solvency of a person or entity based on the applicable assessment.',
    commonlyUsedFor: [
      'Government procedures',
      'Financial requirements',
      'Property-related matters',
      'Official applications',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'disability-certificate',
    name: 'Disability Certificate',
    description:
      'An official certificate documenting a person’s disability status according to the applicable assessment process.',
    commonlyUsedFor: [
      'Government benefits',
      'Reservations',
      'Scholarships',
      'Government schemes',
    ],
    issuer: 'Authorized medical or government authority',
  },

  {
    id: 'senior-citizen-id',
    name: 'Senior Citizen ID Card',
    description:
      'An identification document issued under applicable government or administrative processes for senior citizens.',
    commonlyUsedFor: [
      'Senior citizen services',
      'Government benefits',
      'Administrative identification',
    ],
    issuer: 'Relevant government authority',
  },
  {
    id: 'address-proof',
    name: 'Address Proof',
    description:
      'A document used to establish or verify a person’s residential address.',
    commonlyUsedFor: [
      'Government applications',
      'Identity verification',
      'Address verification',
    ],
    issuer: 'Depends on the document used as proof',
  },

  {
    id: 'affidavit',
    name: 'Affidavit',
    description:
      'A written declaration made by a person and sworn or affirmed according to the applicable process.',
    commonlyUsedFor: [
      'Government applications',
      'Certificates',
      'Declarations',
      'Legal procedures',
    ],
    issuer: 'Prepared and affirmed according to the applicable process',
  },

  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    description:
      'An official record that documents a person’s birth.',
    commonlyUsedFor: [
      'Identity verification',
      'Age verification',
      'Government applications',
      'Education-related applications',
    ],
    issuer: 'Relevant birth registration authority',
  },
  {
    id: 'voter-id',
    name: 'Voter ID',
    description:
      'An election-related identity document issued to eligible voters.',
    commonlyUsedFor: [
      'Electoral identification',
      'Identity verification',
      'Government applications',
    ],
    issuer: 'Election Commission of India',
  },

  {
    id: 'passport',
    name: 'Passport',
    description:
      'A government-issued travel document that establishes identity and nationality for international travel.',
    commonlyUsedFor: [
      'International travel',
      'Identity verification',
      'Visa applications',
      'Immigration procedures',
    ],
    issuer: 'Passport Seva / Ministry of External Affairs',
  },

  {
    id: 'driving-licence',
    name: 'Driving Licence',
    description:
      'An official licence authorizing a person to drive specified classes of motor vehicles.',
    commonlyUsedFor: [
      'Driving authorization',
      'Identity verification',
      'Address verification',
      'Government applications',
    ],
    issuer: 'Relevant State or Union Territory transport authority',
  },

  {
    id: 'ration-card',
    name: 'Ration Card',
    description:
      'A document used by eligible households to access applicable public distribution system benefits.',
    commonlyUsedFor: [
      'Public distribution services',
      'Government schemes',
      'Household-related verification',
    ],
    issuer: 'Relevant State or Union Territory authority',
  },

  {
    id: 'school-certificate',
    name: 'School Certificate',
    description:
      'A certificate issued by an educational institution confirming relevant details about a student.',
    commonlyUsedFor: [
      'Education applications',
      'Admission',
      'Qualification verification',
      'Government applications',
    ],
    issuer: 'Relevant educational institution',
  },

  {
    id: 'transfer-certificate',
    name: 'Transfer Certificate',
    description:
      'A certificate issued by an educational institution when a student leaves or transfers from the institution.',
    commonlyUsedFor: [
      'School admission',
      'College admission',
      'Educational transfers',
    ],
    issuer: 'Relevant educational institution',
  },

  {
    id: 'character-certificate',
    name: 'Character Certificate',
    description:
      'A certificate stating the character or conduct of a person as certified by an authorized institution or authority.',
    commonlyUsedFor: [
      'Education',
      'Employment',
      'Government applications',
      'Institutional procedures',
    ],
    issuer: 'Relevant institution or authorized authority',
  },

  {
    id: 'discharge-certificate',
    name: 'Discharge Certificate',
    description:
      'An official document issued when a person is formally discharged from an applicable service or institution.',
    commonlyUsedFor: [
      'Service records',
      'Government procedures',
      'Employment-related verification',
    ],
    issuer: 'Relevant issuing authority',
  },

  {
    id: 'pension-certificate',
    name: 'Pension Certificate',
    description:
      'A document or certificate used in applicable pension-related administrative processes.',
    commonlyUsedFor: [
      'Pension applications',
      'Pension verification',
      'Government benefits',
    ],
    issuer: 'Relevant pension or government authority',
  },

  {
    id: 'non-creamy-layer',
    name: 'Non-Creamy Layer Certificate',
    description:
      'A certificate used to establish non-creamy-layer status under the applicable OBC rules.',
    commonlyUsedFor: [
      'Reservations',
      'Educational applications',
      'Government jobs',
      'Government schemes',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'nationality-certificate',
    name: 'Nationality Certificate',
    description:
      'A certificate used in applicable procedures to establish a person’s nationality.',
    commonlyUsedFor: [
      'Government applications',
      'Nationality verification',
      'Official procedures',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'legal-guardian-certificate',
    name: 'Legal Guardian Certificate',
    description:
      'A document establishing or recording a person’s legal guardianship in applicable circumstances.',
    commonlyUsedFor: [
      'Legal procedures',
      'Government applications',
      'Child-related administrative procedures',
    ],
    issuer: 'Relevant court or government authority',
  },

  {
    id: 'surviving-member-certificate',
    name: 'Surviving Member Certificate',
    description:
      'A certificate or document identifying surviving family members in applicable administrative procedures.',
    commonlyUsedFor: [
      'Pension matters',
      'Government procedures',
      'Administrative claims',
      'Family-related records',
    ],
    issuer: 'Relevant government authority',
  },

  {
    id: 'non-encumbrance-certificate',
    name: 'Non-Encumbrance Certificate',
    description:
      'A document used to provide information about registered encumbrances affecting a property, according to the applicable records.',
    commonlyUsedFor: [
      'Property transactions',
      'Property verification',
      'Loans',
      'Legal procedures',
    ],
    issuer: 'Relevant land or registration authority',
  },

  {
    id: 'solvency-affidavit',
    name: 'Solvency Affidavit',
    description:
      'An affidavit containing a declaration concerning financial or property solvency for an applicable procedure.',
    commonlyUsedFor: [
      'Solvency applications',
      'Property-related procedures',
      'Government applications',
      'Legal declarations',
    ],
    issuer: 'Prepared and affirmed according to the applicable process',
  },
  {
    id: 'marksheet',
    name: 'Marksheet',
    description:
      'An academic document showing a student’s subjects, marks, and results.',
    commonlyUsedFor: [
      'College admission',
      'Scholarships',
      'Education applications',
      'Identity or qualification verification',
    ],
    issuer: 'Relevant educational institution or examination authority',
  },

  {
    id: 'photograph',
    name: 'Photograph',
    description:
      'A recent photograph of the applicant used for identification and application forms.',
    commonlyUsedFor: [
      'Application forms',
      'Identity documents',
      'Certificates',
      'Admissions',
    ],
    issuer: 'Applicant-provided',
  },

  {
    id: 'signature',
    name: 'Signature',
    description:
      'The applicant’s signature used to confirm declarations and information provided in a form.',
    commonlyUsedFor: [
      'Application forms',
      'Declarations',
      'Affidavits',
      'Official applications',
    ],
    issuer: 'Applicant-provided',
  },
]

function DocumentDictionary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [purpose, setPurpose] = useState('All Purposes')
  const [sortBy, setSortBy] = useState('Name')

  const categoryMap: Record<string, string> = {
    aadhaar: 'Identity Proof',
    'pan-card': 'Identity Proof',
    'voter-id': 'Identity Proof',
    passport: 'Identity Proof',
    'driving-licence': 'Identity Proof',

    marksheet: 'Academic',
    'school-certificate': 'Academic',
    'transfer-certificate': 'Academic',

    'income-certificate': 'Financial',
    solvency: 'Financial',
    'solvency-certificate': 'Financial',
    'solvency-affidavit': 'Financial',
    'ration-card': 'Financial',

    'address-proof': 'Address Proof',
    'residence-certificate': 'Address Proof',
    'domicile-certificate': 'Address Proof',

    'birth-certificate': 'Certificates',
    'death-certificate': 'Certificates',
    'marriage-certificate': 'Certificates',
    'character-certificate': 'Certificates',
    'disability-certificate': 'Certificates',
    'senior-citizen-id': 'Certificates',

    'obc-certificate': 'Legal',
    'sc-certificate': 'Legal',
    'st-certificate': 'Legal',
    affidavit: 'Legal',
    'legal-heir-certificate': 'Legal',
    'legal-guardian-certificate': 'Legal',
    'non-creamy-layer': 'Legal',
    'nationality-certificate': 'Legal',
    'surviving-member-certificate': 'Legal',
    'non-encumbrance-certificate': 'Legal',
    'discharge-certificate': 'Legal',
    'pension-certificate': 'Legal',

    photograph: 'Other',
    signature: 'Other',
  }

  const purposes = [
    'All Purposes',
    'Mandatory',
    'Important',
    'Situational',
  ]

  const categories = [
    'All Categories',
    'Identity Proof',
    'Academic',
    'Financial',
    'Certificates',
    'Address Proof',
    'Legal',
    'Other',
  ]

  function getCategory(document: DocumentDefinition) {
    return categoryMap[document.id] || 'Other'
  }

  function getPurpose(document: DocumentDefinition) {
    const name = document.name.toLowerCase()

    if (
      [
        'aadhaar',
        'pan card',
        'passport',
        'birth certificate',
        'marksheet',
        'photograph',
        'signature',
      ].some((item) => name.includes(item))
    ) {
      return 'Mandatory'
    }

    if (
      [
        'income certificate',
        'obc certificate',
        'sc certificate',
        'st certificate',
        'domicile certificate',
        'residence certificate',
        'transfer certificate',
      ].some((item) => name.includes(item))
    ) {
      return 'Important'
    }

    return 'Situational'
  }

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = documents.filter((document) => {
      const matchesSearch =
        !query ||
        document.name.toLowerCase().includes(query) ||
        document.description.toLowerCase().includes(query) ||
        document.commonlyUsedFor.some((item) =>
          item.toLowerCase().includes(query),
        )

      const matchesCategory =
        category === 'All Categories' ||
        getCategory(document) === category

      const matchesPurpose =
        purpose === 'All Purposes' ||
        getPurpose(document) === purpose

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPurpose
      )
    })

    return [...result].sort((a, b) => {
      if (sortBy === 'Name') {
        return a.name.localeCompare(b.name)
      }

      if (sortBy === 'Category') {
        return getCategory(a).localeCompare(
          getCategory(b),
        )
      }

      return 0
    })
  }, [search, category, purpose, sortBy])

  const visibleDocuments = filteredDocuments.slice(0, 10)

  const mandatoryCount = documents.filter(
    (document) => getPurpose(document) === 'Mandatory',
  ).length

  const importantCount = documents.filter(
    (document) => getPurpose(document) === 'Important',
  ).length

  const situationalCount = documents.filter(
    (document) => getPurpose(document) === 'Situational',
  ).length

  return (
    <main className="document-dictionary-page">

      {/* 
          PAGE HEADER
       */}

      <section className="dictionary-page-header">
        <div>
          <p className="eyebrow">
            DOCUMENT DICTIONARY
          </p>

          <h1>
            Document Dictionary
          </h1>

          <p>
            Explore information about important
            documents, their purpose, and how to
            obtain them.
          </p>
        </div>
      </section>

      {/* 
          DICTIONARY LAYOUT
       */}

      <div className="dictionary-layout">

        {/* 
            LEFT SIDEBAR
         */}

        <aside className="dictionary-sidebar">

          <p className="sidebar-heading">
            DOCUMENT DICTIONARY
          </p>

          <button
            type="button"
            className={`dictionary-category ${
              category === 'All Categories'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCategory('All Categories')
            }
          >
            <span>▣</span>
            All Documents
          </button>

          {categories
            .filter(
              (item) => item !== 'All Categories',
            )
            .map((item) => (
              <button
                key={item}
                type="button"
                className={`dictionary-category ${
                  category === item
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setCategory(item)
                }
              >
                <span>▧</span>
                {item}
              </button>
            ))}

          <div className="dictionary-sidebar-divider" />

          <div className="dictionary-info-card">
            <div className="dictionary-info-icon">
              📖
            </div>

            <h3>
              What is Document Dictionary?
            </h3>

            <p>
              Your one-stop guide to all important
              documents. Understand what they are,
              why they are needed, and how to get them.
            </p>

            <button
              type="button"
              className="learn-more-button"
            >
              Learn More
              <span>↗</span>
            </button>
          </div>
        </aside>

        {/* 
            MAIN COLUMN
         */}

        <section className="dictionary-main">

          {/* SEARCH + FILTERS */}

          <div className="dictionary-toolbar">

            <div className="dictionary-search">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search documents by name or keyword..."
              />
            </div>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={purpose}
              onChange={(event) =>
                setPurpose(event.target.value)
              }
              aria-label="Filter by purpose"
            >
              {purposes.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              aria-label="Sort documents"
            >
              <option>Name</option>
              <option>Category</option>
            </select>
          </div>

          <div className="dictionary-results-count">
            Showing 1 to {visibleDocuments.length} of{' '}
            {filteredDocuments.length} documents
          </div>

          {/* DOCUMENT LIST */}

          <div className="dictionary-results">

            {visibleDocuments.length > 0 ? (
              visibleDocuments.map((document) => (
                <article
                  className="dictionary-result-card"
                  key={document.id}
                >

                  <div className="dictionary-result-icon">
                    📄
                  </div>

                  <div className="dictionary-result-content">

                    <h3>
                      {document.name}
                    </h3>

                    <p>
                      {document.description}
                    </p>

                  </div>

                  <div className="dictionary-result-tags">

                    <span className="category-tag">
                      {getCategory(document)}
                    </span>

                    <span
                      className={`purpose-tag ${getPurpose(
                        document,
                      )
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          '-',
                        )}`}
                    >
                      {getPurpose(document)}
                    </span>

                  </div>

                  <button
                    type="button"
                    className="view-details-button"
                  >
                    View Details
                    <span>→</span>
                  </button>

                </article>
              ))
            ) : (
              <div className="dictionary-empty">
                <div>📄</div>
                <h3>No documents found</h3>
                <p>
                  Try a different search or filter.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* 
            RIGHT SIDEBAR
         */}

        <aside className="dictionary-right-sidebar">

          {/* QUICK STATS */}

          <section className="dictionary-side-panel">

            <h3>
              <span>◉</span>
              Quick Stats
            </h3>

            <div className="quick-stat">
              <div className="quick-stat-icon blue">
                ▣
              </div>

              <div>
                <strong>
                  {documents.length}
                </strong>
                <span>
                  Total Documents
                </span>
              </div>
            </div>

            <div className="quick-stat">
              <div className="quick-stat-icon green">
                ✓
              </div>

              <div>
                <strong>
                  {mandatoryCount}
                </strong>
                <span>
                  Mandatory Documents
                </span>
              </div>
            </div>

            <div className="quick-stat">
              <div className="quick-stat-icon purple">
                ☆
              </div>

              <div>
                <strong>
                  {importantCount}
                </strong>
                <span>
                  Important Documents
                </span>
              </div>
            </div>

            <div className="quick-stat">
              <div className="quick-stat-icon orange">
                i
              </div>

              <div>
                <strong>
                  {situationalCount}
                </strong>
                <span>
                  Situational Documents
                </span>
              </div>
            </div>

          </section>

          {/* HELP */}

          <section className="dictionary-side-panel help-panel">

            <h3>
              <span>♧</span>
              Need Help?
            </h3>

            <p>
              Still confused about which documents
              you need?
            </p>

            <button
              type="button"
              className="ask-ai-button"
            >
              ✨ Ask AI Assistant
            </button>

          </section>

          {/* POPULAR */}

          <section className="dictionary-side-panel popular-panel">

            <h3>
              Popular Documents
            </h3>

            <button
              type="button"
              className="popular-document"
              onClick={() => {
                setSearch('Aadhaar')
                setCategory('All Categories')
                setPurpose('All Purposes')
              }}
            >
              <span>▣</span>
              <strong>Aadhaar Card</strong>
              <small>Most required</small>
            </button>

            <button
              type="button"
              className="popular-document"
              onClick={() => {
                setSearch('Marksheet')
                setCategory('Academic')
                setPurpose('All Purposes')
              }}
            >
              <span>▤</span>
              <strong>Marksheet</strong>
              <small>Most uploaded</small>
            </button>

            <button
              type="button"
              className="popular-document"
              onClick={() => {
                setSearch('Address Proof')
                setCategory('Address Proof')
                setPurpose('All Purposes')
              }}
            >
              <span>⌂</span>
              <strong>Address Proof</strong>
              <small>Highly important</small>
            </button>

            <button
              type="button"
              className="view-all-popular"
              onClick={() => {
                setSearch('')
                setCategory('All Categories')
                setPurpose('All Purposes')
              }}
            >
              View All Popular
              <span>→</span>
            </button>

          </section>

        </aside>

      </div>
    </main>
  )
}

export default DocumentDictionary