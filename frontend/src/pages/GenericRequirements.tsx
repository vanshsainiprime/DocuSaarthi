import './Requirements.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type {
  Requirement,
  RequirementStatus,
} from '../types/requirement'

import RequirementCard from '../components/RequirementCard'

import { getDocuments } from '../utils/documentStorage'
import { matchRequirement } from '../utils/documentMatcher'

import { chandigarhIncomeRequirements } from '../data/chandigarhIncomeRequirements'
import { chandigarhResidenceRequirements } from '../data/chandigarhResidenceRequirements'

function GenericRequirements() {
  const [searchParams] = useSearchParams()

  const service =
    searchParams.get('service') ||
    window.location.pathname
      .split('/')[2] ||
    ''

  /*
   * ===============
   * CHANDIGARH SERVICE REQUIREMENTS
   * ===============
   */

  const serviceRequirements: Record<
    string,
    Requirement[]
  > = {
    'income-certificate':
      chandigarhIncomeRequirements,

    'residence-certificate':
      chandigarhResidenceRequirements,

    /*
     * Temporary services.
     * These will be replaced with
     * verified Chandigarh requirements.
     */

    aadhaar: [
      {
        name: 'Identity Proof',
        description:
          'Identity document required for the service.',
        category: 'Identity Proof',
        status: 'NOT CHECKED',
      },
    ],

    'voter-id': [
      {
        name: 'Identity Proof',
        description:
          'Identity document required for the service.',
        category: 'Identity Proof',
        status: 'NOT CHECKED',
      },
    ],

    passport: [
      {
        name: 'Identity Proof',
        description:
          'Identity document required for the service.',
        category: 'Identity Proof',
        status: 'NOT CHECKED',
      },
    ],
  }

  const requirements =
    serviceRequirements[service] || []

  /*
   * ===============
   * REQUIREMENT STATUS
   * ===============
   */

  const [statuses, setStatuses] =
    useState<
      Record<string, RequirementStatus>
    >({})

  /*
   * ===============
   * MATCH USER DOCUMENTS
   * ===============
   */

  useEffect(() => {
    async function checkDocuments() {
      const savedUser =
        localStorage.getItem(
          'docusaarthi-user',
        )

      /*
       * User is not logged in
       */

      if (!savedUser) {
        setStatuses(
          Object.fromEntries(
            requirements.map(
              (requirement) => [
                requirement.name,
                'MISSING',
              ],
            ),
          ) as Record<
            string,
            RequirementStatus
          >,
        )

        return
      }

      try {
        const user =
          JSON.parse(savedUser)

        const documents =
          await getDocuments(user.id)

        /*
         * Match uploaded documents
         * with service requirements.
         */

        const matchedStatuses =
          Object.fromEntries(
            requirements.map(
              (requirement) => [
                requirement.name,
                matchRequirement(
                  requirement,
                  documents,
                ),
              ],
            ),
          ) as Record<
            string,
            RequirementStatus
          >

        setStatuses(
          matchedStatuses,
        )
      } catch (error) {
        console.error(
          'Could not check documents:',
          error,
        )
      }
    }

    checkDocuments()
  }, [requirements])

  /*
   * ===============
   * SERVICE TITLE
   * ===============
   */

  function getServiceTitle() {
    if (!service) {
      return 'Service Requirements'
    }

    return service
      .split('-')
      .map(
        (word) =>
          word
            .charAt(0)
            .toUpperCase() +
          word.slice(1),
      )
      .join(' ')
  }

  /*
   * ===============
   * STATUS CHANGE
   * ===============
   */

  function handleStatusChange(
    requirementName: string,
    status: RequirementStatus,
  ) {
    setStatuses(
      (currentStatuses) => ({
        ...currentStatuses,
        [requirementName]:
          status,
      }),
    )
  }

  /*
   * ===============
   * RENDER
   * ===============
   */

  return (
    <main className="requirements-page">

      {/* 
          HEADER
       */}

      <section className="requirements-header">

        <p className="eyebrow">
          CHANDIGARH SERVICES
        </p>

        <h1>
          {getServiceTitle()}
        </h1>

        <p>
          Check which documents you
          already have and which ones
          you still need.
        </p>

      </section>


      {/* 
          REQUIREMENTS
       */}

      <section className="requirements-list">

        {requirements.length === 0 ? (

          <div className="documents-empty">

            <div className="documents-empty-icon">
              📄
            </div>

            <h3>
              Requirements not
              available yet
            </h3>

            <p>
              We are still adding the
              verified Chandigarh
              requirements for this
              service.
            </p>

          </div>

        ) : (

          requirements.map(
            (requirement) => (

              <RequirementCard
                key={requirement.name}
                name={
                  requirement.name
                }
                description={
                  requirement.description
                }
                status={
                  statuses[
                    requirement.name
                  ] ||
                  'NOT CHECKED'
                }
                onStatusChange={(
                  status,
                ) =>
                  handleStatusChange(
                    requirement.name,
                    status,
                  )
                }
              />

            ),
          )

        )}

      </section>

    </main>
  )
}

export default GenericRequirements