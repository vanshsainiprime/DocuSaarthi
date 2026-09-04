import './ServiceDetails.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ServiceDetails() {
  const navigate = useNavigate()

  const [basis, setBasis] = useState('bonafide')

  function handleViewRequirements() {
    navigate(`/services/obc-certificate/requirements?basis=${basis}`)
  }

  return (
    <main className="service-details-page">
      <div className="service-details-header">
        <h2>OBC Certificate</h2>

        <p>
          Select the basis that applies to your OBC certificate
          application.
        </p>
      </div>

      <div className="basis-options">
        <button
          type="button"
          className={`basis-option ${
            basis === 'bonafide' ? 'selected' : ''
          }`}
          onClick={() => setBasis('bonafide')}
        >
          <strong>Bonafide</strong>
          <span>For applicants with local residence proof.</span>
        </button>

        <button
          type="button"
          className={`basis-option ${
            basis === 'migration' ? 'selected' : ''
          }`}
          onClick={() => setBasis('migration')}
        >
          <strong>Migration</strong>
          <span>For applicants who migrated from another state.</span>
        </button>
      </div>

      <div className="selected-basis">
        <p>Selected basis</p>
        <strong>
          {basis === 'bonafide' ? 'Bonafide' : 'Migration'}
        </strong>
      </div>

      <button
        type="button"
        className="view-requirements-button"
        onClick={handleViewRequirements}
      >
        View Requirements
      </button>
    </main>
  )
}

export default ServiceDetails