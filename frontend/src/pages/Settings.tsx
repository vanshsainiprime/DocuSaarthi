import './Settings.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Theme = 'light' | 'dark'

function Settings() {
  const navigate = useNavigate()

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme =
      localStorage.getItem('docusaarthi-theme')

    return savedTheme === 'dark'
      ? 'dark'
      : 'light'
  })

  const [aiSuggestions, setAiSuggestions] =
    useState(true)

  const [askBeforeUsingInfo, setAskBeforeUsingInfo] =
    useState(true)

  const [applicationReminders, setApplicationReminders] =
    useState(true)

  const [shareLinkExpiry, setShareLinkExpiry] =
    useState(true)

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme

    localStorage.setItem(
      'docusaarthi-theme',
      theme,
    )
  }, [theme])

  function handleLogout() {
    localStorage.removeItem('docusaarthi-user')
    navigate('/login')
  }

  return (
    <main className="settings-page">

      <section className="settings-intro">
        <p className="eyebrow">
          SETTINGS
        </p>

        <h2>Settings</h2>

        <p>
          Manage your account, privacy, AI preferences
          and notifications.
        </p>
      </section>


      {/* ACCOUNT */}

      <section className="settings-section">
        <h3>Account</h3>

        <div className="settings-list">

          <Link
            to="/settings/profile"
            className="settings-item"
          >
            <div>
              <strong>
                Edit Profile
              </strong>

              <span>
                Update your personal information.
              </span>
            </div>

            <span>→</span>
          </Link>


          <Link
            to="/settings/change-password"
            className="settings-item"
          >
            <div>
              <strong>
                Change Password
              </strong>

              <span>
                Update your account password.
              </span>
            </div>

            <span>→</span>
          </Link>


          <button
            type="button"
            className="settings-item danger"
            onClick={handleLogout}
          >
            <div>
              <strong>
                Logout
              </strong>

              <span>
                Sign out of DocuSaarthi.
              </span>
            </div>

            <span>→</span>
          </button>

        </div>
      </section>


      {/* APPEARANCE */}

      <section className="settings-section">
        <h3>Appearance</h3>

        <div className="settings-list">

          <div className="settings-item">

            <div>
              <strong>
                Dark Mode
              </strong>

              <span>
                Switch between light and dark
                appearance.
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={(event) =>
                  setTheme(
                    event.target.checked
                      ? 'dark'
                      : 'light',
                  )
                }
              />

              <span className="toggle-slider" />

            </label>

          </div>

        </div>
      </section>


      {/* PRIVACY */}

      <section className="settings-section">
        <h3>🔒 Privacy & Security</h3>

        <div className="settings-list">

          <Link
            to="/settings/share-links"
            className="settings-item"
          >
            <div>
              <strong>
                Active Share Links
              </strong>

              <span>
                View documents currently shared.
              </span>
            </div>

            <span>→</span>
          </Link>

        </div>
      </section>


      {/* AI */}

      <section className="settings-section">
        <h3>🤖 AI Preferences</h3>

        <div className="settings-list">

          <div className="settings-item">

            <div>
              <strong>
                AI Suggestions
              </strong>

              <span>
                Allow DocuSaarthi AI to suggest
                information while filling forms.
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={aiSuggestions}
                onChange={(event) =>
                  setAiSuggestions(
                    event.target.checked,
                  )
                }
              />

              <span className="toggle-slider" />

            </label>

          </div>


          <div className="settings-item">

            <div>
              <strong>
                Ask Before Using My Information
              </strong>

              <span>
                Ask for confirmation before AI uses
                information from your profile or
                documents.
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={askBeforeUsingInfo}
                onChange={(event) =>
                  setAskBeforeUsingInfo(
                    event.target.checked,
                  )
                }
              />

              <span className="toggle-slider" />

            </label>

          </div>

        </div>
      </section>


      {/* NOTIFICATIONS */}

      <section className="settings-section">
        <h3>🔔 Notifications</h3>

        <div className="settings-list">

          <div className="settings-item">

            <div>
              <strong>
                Application Reminders
              </strong>

              <span>
                Receive reminders about unfinished
                applications.
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={applicationReminders}
                onChange={(event) =>
                  setApplicationReminders(
                    event.target.checked,
                  )
                }
              />

              <span className="toggle-slider" />

            </label>

          </div>


          <div className="settings-item">

            <div>
              <strong>
                Share Link Expiry
              </strong>

              <span>
                Get notified when a share link is
                about to expire.
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={shareLinkExpiry}
                onChange={(event) =>
                  setShareLinkExpiry(
                    event.target.checked,
                  )
                }
              />

              <span className="toggle-slider" />

            </label>

          </div>

        </div>
      </section>


      {/* ABOUT */}

      <section className="settings-section">
        <h3>About DocuSaarthi</h3>

        <div className="settings-list">

          <button
            type="button"
            className="settings-item"
          >
            <div>
              <strong>
                Privacy
              </strong>

              <span>
                Learn how DocuSaarthi handles data.
              </span>
            </div>

            <span>→</span>
          </button>


          <button
            type="button"
            className="settings-item"
          >
            <div>
              <strong>
                Terms
              </strong>

              <span>
                View the terms of service.
              </span>
            </div>

            <span>→</span>
          </button>


          <div className="settings-item">

            <div>
              <strong>
                Version
              </strong>

              <span>
                DocuSaarthi Prototype
              </span>
            </div>

            <span>
              v1.0.0
            </span>

          </div>

        </div>
      </section>

    </main>
  )
}

export default Settings