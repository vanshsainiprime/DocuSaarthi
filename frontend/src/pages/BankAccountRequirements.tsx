import './Requirements.css'
import { useEffect, useState } from 'react'
import { bankAccountRequirements } from '../data/bankAccountRequirements'
import RequirementCard from '../components/RequirementCard'
import type { RequirementStatus } from '../types/requirement'

function BankAccountRequirements() {
  const [statuses, setStatuses] = useState<Record<string, RequirementStatus>>(
    () => {
      const savedStatuses = localStorage.getItem(
        'bank-account-statuses',
      )

      if (savedStatuses) {
        return JSON.parse(savedStatuses)
      }

      return Object.fromEntries(
        bankAccountRequirements.map((requirement) => [
          requirement.name,
          requirement.status,
        ]),
      )
    },
  )

  useEffect(() => {
    localStorage.setItem(
      'bank-account-statuses',
      JSON.stringify(statuses),
    )
  }, [statuses])

  function handleStatusChange(
    name: string,
    newStatus: RequirementStatus,
  ) {
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [name]: newStatus,
    }))
  }

  const totalCount = bankAccountRequirements.length

  const availableCount = Object.values(statuses).filter(
    (status) => status === 'AVAILABLE',
  ).length

  const missingCount = Object.values(statuses).filter(
    (status) => status === 'MISSING',
  ).length

  const reviewCount = Object.values(statuses).filter(
    (status) => status === 'NEEDS REVIEW',
  ).length

  const notCheckedCount = Object.values(statuses).filter(
    (status) => status === 'NOT CHECKED',
  ).length

  const missingRequirements = bankAccountRequirements.filter(
    (requirement) => statuses[requirement.name] === 'MISSING',
  )

  const reviewRequirements = bankAccountRequirements.filter(
    (requirement) => statuses[requirement.name] === 'NEEDS REVIEW',
  )

  return (
    <main className="requirements-page">
      <h2>Bank Account Opening</h2>

      <p>Documents required for this application</p>

      <div className="requirements-summary">
        <div className="summary-item">
          <p>Ready</p>
          <strong>
            {availableCount} / {totalCount}
          </strong>
        </div>

        <div className="summary-item">
          <p>Missing</p>
          <strong>{missingCount}</strong>
        </div>

        <div className="summary-item">
          <p>Needs Review</p>
          <strong>{reviewCount}</strong>
        </div>

        <div className="summary-item">
          <p>Not Checked</p>
          <strong>{notCheckedCount}</strong>
        </div>
      </div>

      {missingRequirements.length > 0 && (
        <div className="requirements-alert">
          <h3>Missing Documents</h3>

          <ul>
            {missingRequirements.map((requirement) => (
              <li key={requirement.name}>
                {requirement.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {reviewRequirements.length > 0 && (
        <div className="requirements-alert">
          <h3>Needs Review</h3>

          <ul>
            {reviewRequirements.map((requirement) => (
              <li key={requirement.name}>
                {requirement.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {bankAccountRequirements.map((requirement) => (
        <RequirementCard
          key={requirement.name}
          name={requirement.name}
          description={requirement.description}
          status={statuses[requirement.name]}
          onStatusChange={(newStatus) =>
            handleStatusChange(requirement.name, newStatus)
          }
        />
      ))}
    </main>
  )
}

export default BankAccountRequirements