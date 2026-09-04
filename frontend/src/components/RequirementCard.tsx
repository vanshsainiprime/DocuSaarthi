import './RequirementCard.css'
import type { RequirementStatus } from '../types/requirement'

type RequirementCardProps = {
  name: string
  description: string
  status: RequirementStatus
  matchedDocument?: string
  onStatusChange: (status: RequirementStatus) => void
}

function RequirementCard({
  name,
  description,
  status,
  matchedDocument,
  onStatusChange,
}: RequirementCardProps) {
  return (
    <div className="requirement-card">

      <h3>{name}</h3>

      <p>{description}</p>

      {matchedDocument && (
        <p className="matched-document">
          📄 Matched document:{' '}
          <strong>{matchedDocument}</strong>
        </p>
      )}

      <p
        className={`status ${status
          .toLowerCase()
          .replace(' ', '-')}`}
      >
        {status}
      </p>

      <button
        type="button"
        className={
          status === 'AVAILABLE'
            ? 'selected'
            : ''
        }
        onClick={() =>
          onStatusChange(
            status === 'AVAILABLE'
              ? 'NOT CHECKED'
              : 'AVAILABLE',
          )
        }
      >
        I Have This
      </button>

      <button
        type="button"
        className={
          status === 'MISSING'
            ? 'selected'
            : ''
        }
        onClick={() =>
          onStatusChange(
            status === 'MISSING'
              ? 'NOT CHECKED'
              : 'MISSING',
          )
        }
      >
        I Don't Have This
      </button>

      <button
        type="button"
        className={
          status === 'NEEDS REVIEW'
            ? 'selected'
            : ''
        }
        onClick={() =>
          onStatusChange(
            status === 'NEEDS REVIEW'
              ? 'NOT CHECKED'
              : 'NEEDS REVIEW',
          )
        }
      >
        Needs Review
      </button>

    </div>
  )
}

export default RequirementCard