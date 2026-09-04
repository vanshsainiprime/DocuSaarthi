import './ChangePassword.css'
import { useState } from 'react'

function ChangePassword() {
  const [currentPassword, setCurrentPassword] =
    useState('')

  const [newPassword, setNewPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.')
      return
    }

    if (newPassword.length < 8) {
      alert(
        'Password must be at least 8 characters.',
      )
      return
    }

    const savedUser =
      localStorage.getItem(
        'docusaarthi-user',
      )

    if (!savedUser) {
      alert('Please log in first.')
      return
    }

    try {
      const user = JSON.parse(savedUser)

      setLoading(true)

      const response = await fetch(
        'http://localhost:3000/api/auth/change-password',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            userId: user.id,
            currentPassword,
            newPassword,
          }),
        },
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Could not change password.',
        )
      }

      alert(
        'Password changed successfully.',
      )

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

    } catch (error) {
      console.error(
        'Change password error:',
        error,
      )

      alert(
        error instanceof Error
          ? error.message
          : 'Could not change password.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="change-password-page">

      <section className="change-password-intro">

        <p className="eyebrow">
          ACCOUNT SECURITY
        </p>

        <h2>Change Password</h2>

        <p>
          Update your password to keep your
          DocuSaarthi account secure.
        </p>

      </section>

      <form
        className="password-form"
        onSubmit={handleSubmit}
      >

        <label>
          Current Password

          <input
            type="password"
            value={currentPassword}
            onChange={(event) =>
              setCurrentPassword(
                event.target.value,
              )
            }
            placeholder="Enter current password"
            required
          />
        </label>

        <label>
          New Password

          <input
            type="password"
            value={newPassword}
            onChange={(event) =>
              setNewPassword(
                event.target.value,
              )
            }
            placeholder="Enter new password"
            required
          />
        </label>

        <label>
          Confirm New Password

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value,
              )
            }
            placeholder="Confirm new password"
            required
          />
        </label>

        <p className="password-hint">
          Use at least 8 characters for your
          password.
        </p>

        <button
          type="submit"
          className="change-password-button"
          disabled={loading}
        >
          {loading
            ? 'Changing Password...'
            : 'Change Password'}
        </button>

      </form>

    </main>
  )
}

export default ChangePassword