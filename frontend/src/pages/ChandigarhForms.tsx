import './ChandigarhForms.css'
import { chandigarhForms } from '../data/chandigarhForms'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'
function ChandigarhForms() {
    const [search, setSearch] = useState('')
    
  const filteredForms = chandigarhForms.filter((form) =>
    form.name.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <main className="chandigarh-forms-page">
      <div className="forms-intro">
        <p className="eyebrow">APPLICATION FORMS</p>
        <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search forms..."
      />

        <h2>Chandigarh</h2>

        <p>
          Find application forms for Chandigarh
          government services.
        </p>
      </div>

      <div className="forms-list">
        {filteredForms.map((form) => (
          <article
            className="application-form-card"
            key={form.id}
          >
            <div className="form-icon">
              📄
            </div>

            <div className="form-content">
              <h3>{form.name}</h3>

              <div className="form-meta">
                {form.language && (
                  <span>{form.language}</span>
                )}

                {form.type && (
                  <span>{form.type}</span>
                )}
              </div>

              <div className="form-actions">
                {form.sourceUrl && (
                  <a
                    href={form.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="view-form-button"
                  >
                    View Form
                  </a>
                )}

                <button
                  type="button"
                  className="ai-form-button"
                >
                  ✨ Fill with AI
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ChandigarhForms