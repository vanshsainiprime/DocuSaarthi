import './Services.css'
import { Link } from 'react-router-dom'

function Services() {
  return (
    <main className="services-page">
      <section className="services-intro">
        <p className="eyebrow">
          GOVERNMENT SERVICES
        </p>

        <h2>
          Government Services
        </h2>

        <p>
          Find official government services by state
          or union territory.
        </p>
      </section>

      <section className="states-section">
        <h3>
          States & Union Territories
        </h3>

        <div className="states-list">

          <Link
            to="/services/chandigarh"
            className="state-card"
          >
            <div className="state-icon">
              🇮🇳
            </div>

            <div className="state-content">
              <h4>
                Chandigarh
              </h4>

              <p>
                Government services for Chandigarh.
              </p>

              <span>
                Browse Services →
              </span>
            </div>
          </Link>


          <Link
            to="/services/delhi"
            className="state-card"
          >
            <div className="state-icon">
              🇮🇳
            </div>

            <div className="state-content">
              <h4>
                Delhi
              </h4>

              <p>
                Government services for Delhi.
              </p>

              <span>
                Browse Services →
              </span>
            </div>
          </Link>

        </div>
      </section>
    </main>
  )
}

export default Services