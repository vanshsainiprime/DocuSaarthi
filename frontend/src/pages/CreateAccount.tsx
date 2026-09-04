import './CreateAccount.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateAccount() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (password.length < 6) {
      setError(
        'Password must be at least 6 characters.',
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Could not create account.',
        )
      }

      navigate('/login', {
        state: {
          message:
            'Account created successfully. Please log in.',
        }
      })

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Could not create account.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="create-account-page">

      <div className="create-account-card">

        <div className="create-account-header">
          <p className="eyebrow">
            DOCUSAARTHI
          </p>

          <h2>Create your account</h2>

          <p>
            Create an account to securely manage
            your documents and personal information.
          </p>
        </div>

        {error && (
          <div className="account-error">
            {error}
          </div>
        )}

        <form
          className="create-account-form"
          onSubmit={handleSubmit}
        >

          <label>
            Full Name

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </label>

          <label>
            Email Address

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </label>

          <label>
            Confirm Password

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value,
                )
              }
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account'}
          </button>

        </form>

        <div className="create-account-footer">
          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Log in
          </Link>
        </div>

      </div>

    </main>
  )
}

export default CreateAccount