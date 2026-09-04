import './ActiveShareLinks.css'
import { useEffect, useState } from 'react'

type SharedFile = {
  name: string
  type: string
  size: number
}

type ShareLink = {
  id: string
  token: string
  createdAt: string
  expiresAt: string
  shareUrl: string
  files: SharedFile[]
}

function ActiveShareLinks() {
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadShareLinks() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:3000/api/shares',
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Could not load share links.',
        )
      }

      setShareLinks(data)
    } catch (error) {
      console.error('Load share links error:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Could not load share links.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadShareLinks()
  }, [])

  async function handleRevoke(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to revoke access to this share link?',
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/shares/${id}`,
        {
          method: 'DELETE',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Could not revoke access.',
        )
      }

      setShareLinks((currentLinks) =>
        currentLinks.filter(
          (shareLink) => shareLink.id !== id,
        ),
      )
    } catch (error) {
      console.error('Revoke error:', error)

      alert(
        error instanceof Error
          ? error.message
          : 'Could not revoke access.',
      )
    }
  }

  async function handleCopyLink(shareUrl: string) {
    try {
      await navigator.clipboard.writeText(shareUrl)

      alert('Share link copied to clipboard.')
    } catch (error) {
      console.error('Copy error:', error)

      alert('Could not copy the share link.')
    }
  }

  if (loading) {
    return (
      <main className="share-links-page">
        <section className="share-links-intro">
          <p className="eyebrow">
            PRIVACY & SECURITY
          </p>

          <h2>Active Share Links</h2>

          <p>Loading your active share links...</p>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="share-links-page">
        <section className="share-links-intro">
          <p className="eyebrow">
            PRIVACY & SECURITY
          </p>

          <h2>Active Share Links</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={loadShareLinks}
          >
            Try Again
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="share-links-page">

      <section className="share-links-intro">
        <p className="eyebrow">
          PRIVACY & SECURITY
        </p>

        <h2>Active Share Links</h2>

        <p>
          Manage documents that you have shared
          through DocuSaarthi.
        </p>
      </section>

      {shareLinks.length === 0 ? (
        <section className="no-share-links">
          <div>🔒</div>

          <h3>No active share links</h3>

          <p>
            Documents you share will appear here.
          </p>
        </section>
      ) : (
        <section className="share-links-list">

          {shareLinks.map((shareLink) => (
            <article
              className="share-link-card"
              key={shareLink.id}
            >

              <div className="share-link-header">

                <div className="share-link-icon">
                  🔗
                </div>

                <div>
                  <h3>
                    Shared Documents
                  </h3>

                  <p>
                    Created{' '}
                    {new Date(
                      shareLink.createdAt,
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

              <div className="share-link-details">

                <div>
                  <strong>Documents</strong>

                  <div className="document-tags">
                    {shareLink.files.map(
                      (file) => (
                        <span key={file.name}>
                          📄 {file.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="expiry">

                  <strong>Expires</strong>

                  <span>
                    {new Date(
                      shareLink.expiresAt,
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

              <div className="share-link-actions">

                <button
                  type="button"
                  className="copy-button"
                  onClick={() =>
                    handleCopyLink(
                      shareLink.shareUrl,
                    )
                  }
                >
                  🔗 Copy Link
                </button>

                <button
                  type="button"
                  className="revoke-button"
                  onClick={() =>
                    handleRevoke(
                      shareLink.id,
                    )
                  }
                >
                  Revoke Access
                </button>

              </div>

            </article>
          ))}

        </section>
      )}

    </main>
  )
}

export default ActiveShareLinks