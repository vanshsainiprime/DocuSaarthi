import './SharedDocuments.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type SharedFile = {
  id: string
  name: string
  type: string
  size: number
  downloadUrl: string
}

type ShareData = {
  id: string
  createdAt: string
  expiresAt: string
  files: SharedFile[]
}

function SharedDocuments() {
  const { token } = useParams<{ token: string }>()

  const [share, setShare] =
    useState<ShareData | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadShare() {
      if (!token) {
        setError('Invalid share link.')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/shares/token/${token}`,
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'Could not load shared documents.',
          )
        }

        setShare(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Could not load shared documents.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadShare()
  }, [token])

  if (loading) {
    return (
      <main className="shared-documents-page">
        <div className="shared-state">
          <div className="shared-state-icon">⏳</div>

          <h2>Loading documents...</h2>

          <p>
            Checking your secure share link.
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="shared-documents-page">
        <div className="shared-state">
          <div className="shared-state-icon">
            🔒
          </div>

          <h2>Unable to access documents</h2>

          <p>{error}</p>
        </div>
      </main>
    )
  }

  if (!share) {
    return null
  }

  return (
    <main className="shared-documents-page">

      <section className="shared-intro">

        <p className="eyebrow">
          DOCUSAARTHI
        </p>

        <h2>Shared Documents</h2>

        <p>
          Someone has securely shared these
          documents with you.
        </p>

        <div className="share-expiry">
          🔒 Link expires on{' '}
          
          <strong>
            {new Date(
              share.expiresAt,
            ).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </strong>
        </div>

      </section>

      <section className="shared-files">

        {share.files.map((file) => (
          <article
            className="shared-file-card"
            key={file.id}
          >

            <div className="shared-file-icon">
              📄
            </div>

            <div className="shared-file-info">

              <h3>{file.name}</h3>

              <p>
                {file.type || 'Document'}
                {' • '}
                {(file.size / 1024).toFixed(1)} KB
              </p>

            </div>

            <a
              href={`http://localhost:3000${file.downloadUrl}`}
              className="download-button"
            >
              Download
            </a>

          </article>
        ))}

      </section>

    </main>
  )
}

export default SharedDocuments