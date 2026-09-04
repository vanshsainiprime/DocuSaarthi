import './Login.css'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const message = location.state?.message || ''

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Could not log in.',
        )
      }

      console.log('Logged in user:', data.user)

      // We'll make this persistent later.
      localStorage.setItem(
        'docusaarthi-user',
        JSON.stringify(data.user),
      )

      navigate('/')
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Could not log in.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="login-header">

          <p className="eyebrow">
            DOCUSAARTHI
          </p>

          <h2>
            Welcome back
          </h2>

          <p>
            Log in to access your documents and
            personal information.
          </p>

        </div>

        {message && (
          <div className="login-success">
            {message}
          </div>
        )}

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            autoComplete="email"
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={
              loading ||
              !email.trim() ||
              !password
            }
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

        </form>

        <div className="login-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/create-account">
            Create Account
          </Link>

        </div>

      </div>

    </main>
  )
}

export default Login