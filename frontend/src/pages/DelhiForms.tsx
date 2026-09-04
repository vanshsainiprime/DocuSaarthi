import './ChandigarhForms.css'
import { delhiForms } from '../data/delhiForms'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'

function DelhiForms() {
    const [search, setSearch] = useState('')

const filteredForms = delhiForms.filter(
  (form) =>
    form.name
      .toLowerCase()
      .includes(search.toLowerCase()),
)
  return (
    <main className="chandigarh-forms-page">
      <div className="forms-intro">

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search Chandigarh forms..."
        />
        <p className="eyebrow">
          APPLICATION FORMS
        </p>

        <h2>Delhi</h2>

        <p>
          Find application forms for Delhi
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
                <span>{form.type}</span>
              </div>

              <div className="form-actions">
                <a
                  href={form.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="view-form-button"
                >
                  View Form
                </a>

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

export default DelhiForms