import './Forms.css'
import { Link } from 'react-router-dom'

function Forms() {
  return (
    <main className="forms-page">
      <section className="forms-intro">
        <p className="eyebrow">APPLICATION FORMS</p>

        <h2>Government Application Forms</h2>

        <p>
          Find official application forms by state
          or union territory.
        </p>
      </section>

      <section className="states-section">
        <h3>States & Union Territories</h3>

        <div className="states-list">

          <Link
            to="/forms/chandigarh"
            className="state-card"
          >
            <div className="state-icon">
              🇮🇳
            </div>

            <div className="state-content">
              <h4>Chandigarh</h4>

              <p>
                Application forms for Chandigarh
                government services.
              </p>

              <span>
                Browse Forms →
              </span>
            </div>
          </Link>

          <Link
            to="/forms/delhi"
            className="state-card"
          >
            <div className="state-icon">
              🇮🇳
            </div>

            <div className="state-content">
              <h4>Delhi</h4>

              <p>
                Application forms for Delhi
                government services.
              </p>

              <span>
                Browse Forms →
              </span>
            </div>
          </Link>

        </div>
      </section>
    </main>
  )
}

export default Forms