import './Profile.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDocuments } from '../utils/documentStorage'

type LoggedInUser = {
  id: string
  name: string
  email: string
  createdAt: string
}

type ProfileData = {
  name?: string
  fatherName?: string
  motherName?: string
  dateOfBirth?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
}

function Profile() {
  const [user, setUser] =
    useState<LoggedInUser | null>(null)

  const [profile, setProfile] =
    useState<ProfileData | null>(null)

  const [documentCount, setDocumentCount] =
    useState(0)

  useEffect(() => {
    async function loadProfile() {
      const savedUser =
        localStorage.getItem('docusaarthi-user')

      if (!savedUser) {
        return
      }

      try {
        const parsedUser =
          JSON.parse(savedUser) as LoggedInUser

        setUser(parsedUser)

        const savedProfile =
          localStorage.getItem(
            `docusaarthi-profile-${parsedUser.id}`,
          )

        if (savedProfile) {
          setProfile(
            JSON.parse(savedProfile),
          )
        }

        const documents =
          await getDocuments(parsedUser.id)

        setDocumentCount(documents.length)
      } catch (error) {
        console.error(
          'Could not load profile:',
          error,
        )
      }
    }

    loadProfile()
  }, [])

  if (!user) {
    return (
      <main className="profile-page">
        <section className="login-required-card">
          <h2>Please log in</h2>

          <p>
            Log in to view your profile.
          </p>

          <Link
            to="/login"
            className="primary-profile-button"
          >
            Log In
          </Link>
        </section>
      </main>
    )
  }

  const profileName =
    profile?.name || user.name

  const profileEmail =
    profile?.email || user.email

  const fatherName =
    profile?.fatherName || 'Not added'

  const motherName =
    profile?.motherName || 'Not added'

  const dateOfBirth =
    profile?.dateOfBirth || 'Not added'

  const phone =
    profile?.phone || 'Not added'

  const address =
    profile?.address ||
    profile?.city ||
    profile?.state ||
    'Not added'

  const informationFields = [
    profileName,
    dateOfBirth,
    phone,
    address,
    fatherName,
    motherName,
  ]

  const completedFields =
    informationFields.filter(
      (field) => field !== 'Not added',
    ).length

  const profileCompletion =
    Math.round(
      (completedFields /
        informationFields.length) *
        100,
    )

  return (
    <main className="profile-page">

      {/* PAGE TITLE */}

      <div className="profile-page-title">
        <div>
          <h1>My Profile</h1>
          <p>
            Manage your personal information
            and DocuSaarthi account.
          </p>
        </div>
      </div>


      {/* PROFILE HERO */}

      <section className="profile-hero">

        <div className="profile-identity">

          <div className="profile-photo-wrapper">

            <img
              src="/images/Portrait.png"
              alt={profileName}
              className="profile-photo"
            />

            <Link
              to="/settings/profile"
              className="profile-edit-photo"
              aria-label="Edit profile"
            >
              ✎
            </Link>

          </div>

          <div className="profile-user-info">

            <h2>{profileName}</h2>

            <div className="profile-email-row">

              <span>
                {profileEmail}
              </span>

              <span className="verified-badge">
                ✓ Verified
              </span>

            </div>

            
            <div className="profile-meta">
            
              {user.createdAt && (
                <span>
                  <span className="meta-icon">
                    📅
                  </span>
                  Joined:{' '}
                  {new Date(user.createdAt).toLocaleDateString(
                    'en-IN',
                    {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    },
                  )}
                </span>
              )}
            
              {(profile?.address ||
                profile?.city ||
                profile?.state) && (
                <span>
                  <span className="meta-icon">
                    📍
                  </span>
            
                  {[
                    profile?.address,
                    profile?.city,
                    profile?.state,
                    profile?.pincode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              )}
            
            </div>

          </div>

        </div>


        {/* STATISTICS */}

        <div className="profile-statistics">

          <div className="stat-card">

            <div className="stat-icon blue">
              📄
            </div>

            <strong>
              {documentCount}
            </strong>

            <span>
              Documents
            </span>

            <small>
              Uploaded
            </small>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <strong>
              0
            </strong>

            <span>
              Applications
            </span>

            <small>
              Submitted
            </small>

          </div>


          


         

        </div>

      </section>


      {/* MAIN PROFILE CONTENT */}

      <div className="profile-content">


        {/* LEFT SIDEBAR */}

        <aside className="profile-sidebar">

          <Link
            to="/profile"
            className="profile-nav-item active"
          >
            <span>👤</span>
            Profile Overview
          </Link>

          <Link
            to="/documents"
            className="profile-nav-item"
          >
            <span>📄</span>
            My Documents
          </Link>

        

          <Link
            to="/services"
            className="profile-nav-item"
          >
            <span>▦</span>
            My Services
          </Link>

          
          <Link
            to="/notifications"
            className="profile-nav-item"
          >
            <span className="notification-nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 21h4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          
            Notifications
          </Link>

          <Link
            to="/settings"
            className="profile-nav-item"
          >
            <span>⚙</span>
            Settings
          </Link>

          <div className="profile-sidebar-divider" />

          <Link
            to="/login"
            className="profile-nav-item logout"
          >
            <span>↪</span>
            Logout
          </Link>

        </aside>


        {/* CENTER */}

        <div className="profile-main-column">


          {/* RECENT ACTIVITY */}

          <section className="profile-panel">

            <div className="panel-header">

              <h3>
                Recent Activity
              </h3>

              <span className="panel-link">
                View all activity →
              </span>

            </div>

            <div className="activity-empty">

              <div className="empty-icon">
                ◷
              </div>

              <strong>
                No recent activity
              </strong>

              <p>
                Your document and application
                activity will appear here.
              </p>

            </div>

          </section>


          {/* ACCOUNT SETTINGS */}

          <section className="profile-panel account-panel">

            <div>

              <h3>
                Account Settings
              </h3>

              <p>
                Manage your account preferences
                and security.
              </p>

            </div>

            <Link
              to="/settings"
              className="settings-button"
            >
              ⚙ Manage Settings →
            </Link>

          </section>

        </div>


        {/* RIGHT COLUMN */}

        <aside className="completion-panel">

          <h3>
            Profile Completion
          </h3>


          <div
            className="completion-circle"
            style={{
              '--completion': `${profileCompletion}%`,
            } as React.CSSProperties}
          >
            <div className="completion-inner">
              <strong>
                {profileCompletion}%
              </strong>

              <span>
                Complete
              </span>
            </div>
          </div>


          <p className="completion-description">
            Complete your profile to get
            the best experience.
          </p>


          <div className="completion-list">

            <div>
              <span className="check">
                ✓
              </span>

              <span>
                Basic Information
              </span>
            </div>


            <div>
              <span className="check">
                ✓
              </span>

              <span>
                Email Verified
              </span>
            </div>


            <div>
              <span
                className={
                  phone !== 'Not added'
                    ? 'check'
                    : 'check incomplete'
                }
              >
                ✓
              </span>

              <span>
                Phone Number
              </span>
            </div>


            <div>
              <span className="check">
                ✓
              </span>

              <span>
                Profile Photo
              </span>
            </div>

          </div>

        </aside>

      </div>

    </main>
  )
}

export default Profile