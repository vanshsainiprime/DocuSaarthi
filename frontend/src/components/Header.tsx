import './Header.css'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const showBackButton =
    location.pathname !== '/'

  return (
    <header className="header">

      {/* 
          LEFT SIDE
       */}

      <div className="header-left">

        {showBackButton && (
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        )}

        {/* BRAND */}

        <Link
          to="/"
          className="brand"
        >
          <img
            src="/images/Logo.png"
            alt="DocuSaarthi logo"
            className="brand-logo"
          />

          <img
            src="/images/DocuSaarthi-text-logo.png"
            alt="DocuSaarthi"
            className="brand-text-logo"
          />
        </Link>

      </div>


      {/* 
          PROFILE
       */} 

      <Link
        to="/profile"
        className="profile"
        aria-label="Open profile"
      >
        <img
          src="/images/Portrait.png"
          alt="Profile"
          className="profile-image"
        />

        <span className="profile-label">
          Profile
        </span>
      </Link>

    </header>
  )
}

export default Header