import './Notifications.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Notification = {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning'
  read: boolean
  createdAt: string
}

function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([])

  useEffect(() => {
    const saved =
      localStorage.getItem(
        'docusaarthi-notifications',
      )

    if (saved) {
      try {
        setNotifications(JSON.parse(saved))
      } catch (error) {
        console.error(
          'Could not load notifications:',
          error,
        )
      }
    }
  }, [])

  function saveNotifications(
    updated: Notification[],
  ) {
    setNotifications(updated)

    localStorage.setItem(
      'docusaarthi-notifications',
      JSON.stringify(updated),
    )
  }

  function markAsRead(id: string) {
    const updated = notifications.map(
      (notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
    )

    saveNotifications(updated)
  }

  function markAllAsRead() {
    const updated = notifications.map(
      (notification) => ({
        ...notification,
        read: true,
      }),
    )

    saveNotifications(updated)
  }

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read,
    ).length

  return (
    <main className="notifications-page">

      <div className="notifications-header">

        <div>
          <p className="notifications-eyebrow">
            DOCUSAARTHI
          </p>

          <h1>Notifications</h1>

          <p>
            Stay updated about your documents
            and account.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            className="mark-all-button"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}

      </div>


      {notifications.length === 0 ? (

        <section className="notifications-empty">

          <div className="notifications-empty-icon">
            🔔
          </div>

          <h2>
            You're all caught up
          </h2>

          <p>
            You don't have any notifications
            right now.
          </p>

          <Link
            to="/profile"
            className="notifications-back-button"
          >
            Back to Profile
          </Link>

        </section>

      ) : (

        <section className="notifications-list">

          {notifications.map(
            (notification) => (

              <article
                key={notification.id}
                className={
                  `notification-card ${
                    notification.read
                      ? 'read'
                      : 'unread'
                  }`
                }
                onClick={() =>
                  markAsRead(
                    notification.id,
                  )
                }
              >

                <div
                  className={
                    `notification-icon ${
                      notification.type
                    }`
                  }
                >
                  {notification.type ===
                    'success'
                    ? '✓'
                    : notification.type ===
                      'warning'
                    ? '!'
                    : 'i'}
                </div>

                <div className="notification-content">

                  <div className="notification-title-row">

                    <h3>
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="unread-dot" />
                    )}

                  </div>

                  <p>
                    {notification.message}
                  </p>

                  <time>
                    {new Date(
                      notification.createdAt,
                    ).toLocaleString(
                      'en-IN',
                      {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      },
                    )}
                  </time>

                </div>

              </article>

            ),
          )}

        </section>

      )}

    </main>
  )
}

export default Notifications
