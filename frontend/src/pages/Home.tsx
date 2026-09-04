import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getActivities,
  type Activity,
} from '../utils/activityStorage'

function Home() {
  const navigate = useNavigate()

  const [activities, setActivities] =
    useState<Activity[]>([])

  const [searchQuery, setSearchQuery] =
    useState('')

  const [searchError, setSearchError] =
    useState('')

  useEffect(() => {
    const savedUser =
      localStorage.getItem('docusaarthi-user')

    if (!savedUser) {
      return
    }

    try {
      const user = JSON.parse(savedUser)

      setActivities(
        getActivities(user.id),
      )
    } catch (error) {
      console.error(
        'Could not load activities:',
        error,
      )
    }
  }, [])

  function handleSearch() {
    const query =
      searchQuery.trim().toLowerCase()

    if (!query) {
      return
    }

    const searchableServices = [
      'obc',
      'certificate',
      'college',
      'admission',
      'scholarship',
    ]

    const found =
      searchableServices.some(
        (service) =>
          query.includes(service),
      )

    if (found) {
      setSearchError('')
      navigate('/services')
    } else {
      setSearchError(
        'No matching service found.',
      )
    }
  }

  function getActivityIcon(
    type: Activity['type'],
  ) {
    switch (type) {
      case 'UPLOAD':
        return '📄'

      case 'RENAME':
        return '✏️'

      case 'CATEGORY':
        return '🗂️'

      case 'DELETE':
        return '🗑️'

      case 'SHARE':
        return '🔗'

      default:
        return '📌'
    }
  }

  function getTimeAgo(
    createdAt: string,
  ) {
    const difference =
      Date.now() -
      new Date(createdAt).getTime()

    const seconds =
      Math.floor(difference / 1000)

    if (seconds < 60) {
      return 'Just now'
    }

    const minutes =
      Math.floor(seconds / 60)

    if (minutes < 60) {
      return `${minutes} minute${
        minutes === 1 ? '' : 's'
      } ago`
    }

    const hours =
      Math.floor(minutes / 60)

    if (hours < 24) {
      return `${hours} hour${
        hours === 1 ? '' : 's'
      } ago`
    }

    const days =
      Math.floor(hours / 24)

    return `${days} day${
      days === 1 ? '' : 's'
    } ago`
  }

  return (
    <main className="home-page">

      {/* HERO */}

      <section className="home-hero">

        <div className="home-hero-content">

          <h1>
            Your personal
            <br />
            <span>
              paperwork assistant.
            </span>
          </h1>

          <p className="home-hero-description">
            Find what you need. Check what you have.
            <br />
            Complete your applications with confidence.
          </p>

          <div className="home-search">

            <span className="home-search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(
                  event.target.value,
                )

                setSearchError('')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="Search for a certificate, application or service..."
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              ⌕
            </button>

          </div>

          {searchError && (
            <p className="home-search-error">
              {searchError}
            </p>
          )}

        </div>

        <div className="home-hero-image">

          <img
            src="/images/home-hero.png"
            alt="Person using DocuSaarthi"
          />

        </div>

      </section>

      {/* POPULAR SERVICES */}

      <section className="home-main-options">
      
        <Link
          to="/services"
          className="home-main-option"
        >
          <div className="home-main-option-icon">
            ✓
          </div>
      
          <div>
            <h2>Services</h2>
      
            <p>
              Certificates, applications and
              paperwork tasks.
            </p>
      
            <span>
              Browse Services →
            </span>
          </div>
        </Link>
      
        <Link
          to="/forms"
          className="home-main-option"
        >
          <div className="home-main-option-icon">
            ▤
          </div>
      
          <div>
            <h2>Forms</h2>
      
            <p>
              Find official government forms by
              state or UT.
            </p>
      
            <span>
              Browse Forms →
            </span>
          </div>
        </Link>
      
      </section>


      {/* RECENT ACTIVITY */}

      <section className="recent-activity">

        <div className="recent-activity-header">

          <div>

            <p className="home-section-eyebrow">
              ACTIVITY
            </p>

            <h2>
              Recent Activity
            </h2>

          </div>

          <Link to="/documents">
            View Documents →
          </Link>

        </div>

        <div className="activity-list">

          {activities.length === 0 ? (

            <div className="activity-empty">

              <span>
                📄
              </span>

              <div>

                <strong>
                  No recent activity
                </strong>

                <p>
                  Your document activity
                  will appear here.
                </p>

              </div>

            </div>

          ) : (

            activities
              .slice(0, 5)
              .map((activity) => (

                <div
                  className="activity-item"
                  key={activity.id}
                >

                  <div className="activity-icon">
                    {getActivityIcon(
                      activity.type,
                    )}
                  </div>

                  <div className="activity-content">

                    <strong>
                      {activity.message}
                    </strong>

                    <span>
                      {getTimeAgo(
                        activity.createdAt,
                      )}
                    </span>

                  </div>

                </div>

              ))

          )}

        </div>

      </section>

      

    </main>
  )
}

export default Home