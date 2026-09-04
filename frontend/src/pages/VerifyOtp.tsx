import './Login.css'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function VerifyOtp() {
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const mobileNumber = location.state?.mobileNumber || ''

  const isValidOtp = otp.length === 6

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (!isValidOtp) {
      return
    }

    navigate('/')
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h2>Verify your number</h2>

        <p>
          Enter the 6-digit OTP sent to
        </p>

        <p>
          +91 {mobileNumber}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">
            OTP
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(event) =>
              setOtp(
                event.target.value.replace(/\D/g, ''),
              )
            }
          />

          <button
            type="submit"
            disabled={!isValidOtp}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </main>
  )
}

export default VerifyOtp