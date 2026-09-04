import './FormAssistant.css'
import { useState } from 'react'

type FormField = {
  id: string
  name: string
  suggestion: string
  source: string
  confidence: number
  status: 'SUGGESTED' | 'NEEDS REVIEW'
}

function FormAssistant() {
  const [formFile, setFormFile] = useState<File | null>(null)

  const [fields, setFields] = useState<FormField[]>([
    {
      id: '1',
      name: 'Applicant Name',
      suggestion: 'Vansh',
      source: 'Profile',
      confidence: 0.94,
      status: 'SUGGESTED',
    },
    {
      id: '2',
      name: "Father's Name",
      suggestion: 'Not available',
      source: 'Profile',
      confidence: 0.42,
      status: 'NEEDS REVIEW',
    },
    {
      id: '3',
      name: 'Date of Birth',
      suggestion: 'Not available',
      source: 'Document',
      confidence: 0.31,
      status: 'NEEDS REVIEW',
    },
  ])

  function handleAccept(id: string) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === id
          ? {
              ...field,
              status: 'SUGGESTED',
            }
          : field,
      ),
    )
  }

  function handleEdit(id: string) {
    const field = fields.find(
      (currentField) => currentField.id === id,
    )

    if (!field) {
      return
    }

    const value = window.prompt(
      `Enter ${field.name}:`,
      field.suggestion,
    )

    if (value === null) {
      return
    }

    setFields((currentFields) =>
      currentFields.map((currentField) =>
        currentField.id === id
          ? {
              ...currentField,
              suggestion: value,
              status: 'SUGGESTED',
            }
          : currentField,
      ),
    )
  }

  function handleExplain(field: FormField) {
    window.alert(
      `${field.name}: This field asks for information required by the application form. Review the suggested value before accepting it.`,
    )
  }

  return (
    <main className="form-assistant-page">
      <section className="form-assistant-intro">
        <p className="eyebrow">AI FORM ASSISTANT</p>

        <h2>Let AI help you fill the form</h2>

        <p>
          Upload a form and DocuSaarthi will identify
          fields and suggest information for you.
        </p>
      </section>

      <section className="form-upload-card">
        <h3>Upload your form</h3>

        <p>
          Upload a PDF, JPG, JPEG, or PNG application
          form.
        </p>

        <input
          id="form-upload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]

            if (file) {
              setFormFile(file)
            }
          }}
        />

        <label
          htmlFor="form-upload"
          className="upload-form-button"
        >
          {formFile
            ? 'Change Form'
            : 'Upload Form'}
        </label>

        {formFile && (
          <div className="selected-form">
            <span>📄</span>

            <div>
              <strong>{formFile.name}</strong>

              <small>
                Ready for AI analysis
              </small>
            </div>
          </div>
        )}
      </section>

      <section className="ai-fields-section">
        <div className="section-heading">
          <div>
            <h3>AI Suggestions</h3>

            <p>
              Review every suggestion before using it.
            </p>
          </div>

          <span className="review-badge">
            User review required
          </span>
        </div>

        <div className="form-fields-list">
          {fields.map((field) => (
            <article
              className="ai-field-card"
              key={field.id}
            >
              <div className="field-header">
                <div>
                  <h4>{field.name}</h4>

                  <span
                    className={
                      field.status === 'SUGGESTED'
                        ? 'field-status suggested'
                        : 'field-status review'
                    }
                  >
                    {field.status === 'SUGGESTED'
                      ? 'AI SUGGESTION'
                      : 'NEEDS REVIEW'}
                  </span>
                </div>

                <span className="confidence">
                  {Math.round(
                    field.confidence * 100,
                  )}
                  % confidence
                </span>
              </div>

              <div className="suggestion-box">
                <small>
                  Suggested value
                </small>

                <strong>
                  {field.suggestion}
                </strong>

                <span>
                  Source: {field.source}
                </span>
              </div>

              <div className="field-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleAccept(field.id)
                  }
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(field.id)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExplain(field)
                  }
                >
                  Explain
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default FormAssistant