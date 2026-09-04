import './Requirements.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { obcRequirements } from '../data/obcRequirements'
import RequirementCard from '../components/RequirementCard'
import type { RequirementStatus } from '../types/requirement'
import {
  getDocuments,
} from '../utils/documentStorage'
import {
  matchRequirement,
} from '../utils/documentMatcher'

function Requirements() {
  const [searchParams] = useSearchParams()

  const basis =
    searchParams.get('basis') || 'bonafide'

  const requirements =
    basis === 'migration'
      ? obcRequirements.migration
      : obcRequirements.bonafide

  const [statuses, setStatuses] =
    useState<Record<string, RequirementStatus>>({})

  /*
   * Load the logged-in user's documents
   * and automatically match them with
   * the requirements.
   */
  useEffect(() => {
    async function checkDocuments() {
      const savedUser =
        localStorage.getItem(
          'docusaarthi-user',
        )

      if (!savedUser) {
        setStatuses(
          Object.fromEntries(
            requirements.map((requirement) => [
              requirement.name,
              'MISSING',
            ]),
          ),
        )

        return
      }

      try {
        const user = JSON.parse(savedUser)

        const documents =
          await getDocuments(user.id)

        const matchedStatuses =
          Object.fromEntries(
            requirements.map((requirement) => [
              requirement.name,
              matchRequirement(
                requirement,
                documents,
              ),
            ]),
          ) as Record<
            string,
            RequirementStatus
          >

        setStatuses(matchedStatuses)

      } catch (error) {
        console.error(
          'Could not check documents:',
          error,
        )

        setStatuses(
          Object.fromEntries(
            requirements.map((requirement) => [
              requirement.name,
              'NOT CHECKED',
            ]),
          ),
        )
      }
    }

    checkDocuments()
  }, [basis])

  function handleStatusChange(
    name: string,
    newStatus: RequirementStatus,
  ) {
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [name]: newStatus,
    }))
  }

  const totalCount =
    requirements.length

  const availableCount =
    Object.values(statuses).filter(
      (status) =>
        status === 'AVAILABLE',
    ).length

  const missingCount =
    Object.values(statuses).filter(
      (status) =>
        status === 'MISSING',
    ).length

  const reviewCount =
    Object.values(statuses).filter(
      (status) =>
        status === 'NEEDS REVIEW',
    ).length

  const notCheckedCount =
    Object.values(statuses).filter(
      (status) =>
        status === 'NOT CHECKED',
    ).length

  const missingRequirements =
    requirements.filter(
      (requirement) =>
        statuses[requirement.name] ===
        'MISSING',
    )

  const reviewRequirements =
    requirements.filter(
      (requirement) =>
        statuses[requirement.name] ===
        'NEEDS REVIEW',
    )

  return (
    <main className="requirements-page">

      <h2>OBC Certificate</h2>

      <p>
        Selected basis: {basis}
      </p>

      <div className="requirements-summary">

        <div className="summary-item">
          <p>Ready</p>

          <strong>
            {availableCount} / {totalCount}
          </strong>
        </div>

        <div className="summary-item">
          <p>Missing</p>

          <strong>
            {missingCount}
          </strong>
        </div>

        <div className="summary-item">
          <p>Needs Review</p>

          <strong>
            {reviewCount}
          </strong>
        </div>

        <div className="summary-item">
          <p>Not Checked</p>

          <strong>
            {notCheckedCount}
          </strong>
        </div>

      </div>

      {missingRequirements.length > 0 && (
        <div className="requirements-alert">

          <h3>
            Missing Documents
          </h3>

          <ul>
            {missingRequirements.map(
              (requirement) => (
                <li
                  key={requirement.name}
                >
                  {requirement.name}
                </li>
              ),
            )}
          </ul>

        </div>
      )}

      {reviewRequirements.length > 0 && (
        <div className="requirements-alert">

          <h3>
            Needs Review
          </h3>

          <ul>
            {reviewRequirements.map(
              (requirement) => (
                <li
                  key={requirement.name}
                >
                  {requirement.name}
                </li>
              ),
            )}
          </ul>

        </div>
      )}

      <div className="requirements-list">

        {requirements.map(
          (requirement) => (
            <RequirementCard
              key={requirement.name}
              name={requirement.name}
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
                newStatus,
              ) =>
                handleStatusChange(
                  requirement.name,
                  newStatus,
                )
              }
            />
          ),
        )}

      </div>

    </main>
  )
}

export default Requirements