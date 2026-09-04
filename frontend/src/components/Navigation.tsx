import './Navigation.css'
import {
  NavLink,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  function closeMenu() {
    setIsOpen(false)
  }

  function handleLogout() {
    localStorage.removeItem('docusaarthi-user')
    setIsOpen(false)
    navigate('/login')
  }

  return (
    <>
      {/* 
          HAMBURGER BUTTON
       */}

      <button
        type="button"
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* 
          SIDEBAR
       */}

      <aside
        className={`sidebar ${
          isOpen ? 'open' : ''
        }`}
      >
        {/* 
            SIDEBAR HEADER
         */}

        <div className="sidebar-header">
          <div className="sidebar-title">
            <span className="sidebar-title-icon">
              DS
            </span>

            <div>
              <strong>
                DocuSaarthi
              </strong>

              <small>
                Navigation
              </small>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        {/* 
            NAVIGATION
         */}

        <nav className="sidebar-nav">

          {/* HOME */}

          <NavLink
            to="/"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 10.5L12 3l9 7.5" />

                <path d="M5 9.5V21h14V9.5" />

                <path d="M9 21v-6h6v6" />
              </svg>
            </span>

            <span>
              Home
            </span>
          </NavLink>


          {/* PROFILE */}

          <NavLink
            to="/profile"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                />

                <path
                  d="M5 20c.8-3.4 3.2-5.5 7-5.5s6.2 2.1 7 5.5"
                />
              </svg>
            </span>

            <span>
              Profile Overview
            </span>
          </NavLink>


          {/* SERVICES */}

          <NavLink
            to="/services"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="3"
                  width="14"
                  height="18"
                  rx="2"
                />

                <path d="M9 7h6" />

                <path d="M9 11h6" />

                <path d="M9 15h4" />
              </svg>
            </span>

            <span>
              Services
            </span>
          </NavLink>


          {/* APPLICATION FORMS */}

          <NavLink
            to="/forms"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 3h9l4 4v14H6z" />

                <path d="M14 3v5h5" />

                <path d="M9 13h6" />

                <path d="M9 17h6" />
              </svg>
            </span>

            <span>
              Application Forms
            </span>
          </NavLink>


          {/* MY DOCUMENTS */}

          <NavLink
            to="/documents"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4 6h6l2 2h8v11H4z" />

                <path d="M4 6V4h7l2 2" />
              </svg>
            </span>

            <span>
              My Documents
            </span>
          </NavLink>


          {/* DOCUMENT DICTIONARY */}

          <NavLink
            to="/document-dictionary"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />

                <path d="M8 4v16" />

                <path d="M11 8h5" />

                <path d="M11 12h5" />
              </svg>
            </span>

            <span>
              Document Dictionary
            </span>
          </NavLink>


          {/* NOTIFICATIONS */}

          <NavLink
            to="/notifications"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

                <path d="M10 21h4" />
              </svg>
            </span>

            <span>
              Notifications
            </span>
          </NavLink>


          {/* SETTINGS */}

          <NavLink
            to="/settings"
            className="nav-item"
            onClick={closeMenu}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                />

                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.7-1.7.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9 1.7 1.7 0 0 0-.1-.1L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1z" />
              </svg>
            </span>

            <span>
              Settings
            </span>
          </NavLink>

        </nav>


        {/* 
            BOTTOM
         */}

        <div className="sidebar-bottom">

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <span className="nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 17l5-5-5-5" />

                <path d="M15 12H3" />

                <path d="M13 5V3h7v18h-7v-2" />
              </svg>
            </span>

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* 
          OVERLAY
       */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

    </>
  )
}

export default Navigation