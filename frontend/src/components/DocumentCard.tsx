import './DocumentCard.css'
import type { Document } from '../types/document'
import type { DocumentCategory } from '../types/documentCategory'

type DocumentCardProps = {
  document: Document
  onDelete: (id: string) => void
  onRename: (id: string) => void
  onCategoryChange: (
    id: string,
    category: DocumentCategory,
  ) => void
}

const categories: DocumentCategory[] = [
  'Not Categorized',
  'Identity Proof',
  'Address Proof',
  'Income Certificate',
  'Education Document',
  'Photo',
  'Signature',
  'Family Document',
  'Other',
]

function DocumentCard({
  document,
  onDelete,
  onRename,
  onCategoryChange,
}: DocumentCardProps) {
  const fileType =
    document.name.split('.').pop()?.toUpperCase() || 'FILE'

  const uploadedDate = new Date(
    document.uploadedAt,
  ).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const isImage =
    document.file?.type?.startsWith('image/') ?? false

  const previewUrl = document.file
    ? URL.createObjectURL(document.file)
    : null

  function handleView() {
    if (!(document.file instanceof Blob)) {
      console.error(
        'Document file is not a valid file.',
      )
      return
    }

    const fileUrl = URL.createObjectURL(
      document.file,
    )

    window.open(fileUrl, '_blank')
  }

  return (
    <article className="document-card">

      {/* DOCUMENT PREVIEW */}
      <div className="document-preview">

        {isImage && previewUrl ? (
          <img
            src={previewUrl}
            alt={document.name}
            className="document-preview-image"
          />
        ) : (
          <div className="document-preview-pdf">
            <div className="pdf-page">
              <span className="pdf-label">
                {fileType === 'PDF'
                  ? 'PDF'
                  : fileType}
              </span>

              <div className="pdf-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}

        {/* FILE TYPE */}
        <span className="document-file-type">
          {fileType}
        </span>

      </div>

      {/* DOCUMENT INFORMATION */}
      <div className="document-card-body">

        <h3
          title={document.name}
        >
          {document.name}
        </h3>

        <select
          className="document-category"
          value={document.category}
          onChange={(event) =>
            onCategoryChange(
              document.id,
              event.target.value as DocumentCategory,
            )
          }
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <p className="document-upload-date">
          Uploaded {uploadedDate}
        </p>

      </div>

      {/* ACTIONS */}
      <div className="document-actions">

        <button
          type="button"
          className="document-view-button"
          onClick={handleView}
        >
          View
        </button>

        <button
          type="button"
          className="document-rename-button"
          onClick={() =>
            onRename(document.id)
          }
        >
          Rename
        </button>

        <button
          type="button"
          className="document-delete-button"
          onClick={() =>
            onDelete(document.id)
          }
        >
          Delete
        </button>

      </div>

    </article>
  )
}

export default DocumentCard