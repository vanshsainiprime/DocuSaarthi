import './EditProfile.css'
import { useEffect, useState } from 'react'

type Profile = {
  name: string
  fatherName: string
  motherName: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
}

type LoggedInUser = {
  id: string
  name: string
  email: string
}

const emptyProfile: Profile = {
  name: '',
  fatherName: '',
  motherName: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
}

function EditProfile() {
  const [profile, setProfile] =
    useState<Profile>(emptyProfile)

  const [saved, setSaved] = useState(false)

  const [user, setUser] =
    useState<LoggedInUser | null>(null)

  useEffect(() => {
    const savedUser =
      localStorage.getItem('docusaarthi-user')

    if (!savedUser) {
      return
    }

    try {
      const parsedUser =
        JSON.parse(savedUser) as LoggedInUser

      setUser(parsedUser)

      const profileKey =
        `docusaarthi-profile-${parsedUser.id}`

      const savedProfile =
        localStorage.getItem(profileKey)

      if (savedProfile) {
        const parsedProfile =
          JSON.parse(savedProfile)

        setProfile({
          ...emptyProfile,
          ...parsedProfile,
        })
      } else {
        setProfile({
          ...emptyProfile,
          name: parsedUser.name,
          email: parsedUser.email,
        })
      }
    } catch (error) {
      console.error(
        'Could not load profile:',
        error,
      )
    }
  }, [])

  function handleChange(
    field: keyof Profile,
    value: string,
  ) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }))

    setSaved(false)
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!user) {
      return
    }

    const profileKey =
      `docusaarthi-profile-${user.id}`

    localStorage.setItem(
      profileKey,
      JSON.stringify(profile),
    )

    setSaved(true)
  }

  if (!user) {
    return (
      <main className="edit-profile-page">
        <section className="edit-profile-intro">
          <p className="eyebrow">
            PERSONAL INFORMATION
          </p>

          <h2>Login Required</h2>

          <p>
            Please log in before editing your
            personal information.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="edit-profile-page">

      <section className="edit-profile-intro">

        <p className="eyebrow">
          PERSONAL INFORMATION
        </p>

        <h2>Update Personal Information</h2>

        <p>
          Keep your information up to date so
          DocuSaarthi can use it to help prepare
          forms and applications.
        </p>

      </section>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        {/* BASIC INFORMATION */}

        <section className="profile-form-section">

          <h3>Basic Information</h3>

          <div className="form-grid">

            <label>
              Full Name

              <input
                type="text"
                value={profile.name}
                onChange={(event) =>
                  handleChange(
                    'name',
                    event.target.value,
                  )
                }
                placeholder="Enter your full name"
              />
            </label>

            <label>
              Date of Birth

              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(event) =>
                  handleChange(
                    'dateOfBirth',
                    event.target.value,
                  )
                }
              />
            </label>

            <label>
              Father's Name

              <input
                type="text"
                value={profile.fatherName}
                onChange={(event) =>
                  handleChange(
                    'fatherName',
                    event.target.value,
                  )
                }
                placeholder="Enter father's name"
              />
            </label>

            <label>
              Mother's Name

              <input
                type="text"
                value={profile.motherName}
                onChange={(event) =>
                  handleChange(
                    'motherName',
                    event.target.value,
                  )
                }
                placeholder="Enter mother's name"
              />
            </label>

          </div>

        </section>

        {/* CONTACT */}

        <section className="profile-form-section">

          <h3>Contact Information</h3>

          <div className="form-grid">

            <label>
              Phone Number

              <input
                type="tel"
                value={profile.phone}
                onChange={(event) =>
                  handleChange(
                    'phone',
                    event.target.value,
                  )
                }
                placeholder="Enter phone number"
              />
            </label>

            <label>
              Email

              <input
                type="email"
                value={profile.email}
                onChange={(event) =>
                  handleChange(
                    'email',
                    event.target.value,
                  )
                }
                placeholder="Enter email address"
              />
            </label>

          </div>

        </section>

        {/* ADDRESS */}

        <section className="profile-form-section">

          <h3>Address</h3>

          <div className="form-grid">

            <label className="full-width">
              Address

              <textarea
                value={profile.address}
                onChange={(event) =>
                  handleChange(
                    'address',
                    event.target.value,
                  )
                }
                placeholder="Enter your full address"
                rows={3}
              />
            </label>

            <label>
              City

              <input
                type="text"
                value={profile.city}
                onChange={(event) =>
                  handleChange(
                    'city',
                    event.target.value,
                  )
                }
                placeholder="Enter city"
              />
            </label>

            <label>
              State / UT

              <input
                type="text"
                value={profile.state}
                onChange={(event) =>
                  handleChange(
                    'state',
                    event.target.value,
                  )
                }
                placeholder="Enter state or UT"
              />
            </label>

            <label>
              PIN Code

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={profile.pincode}
                onChange={(event) =>
                  handleChange(
                    'pincode',
                    event.target.value.replace(
                      /\D/g,
                      '',
                    ),
                  )
                }
                placeholder="Enter PIN code"
              />
            </label>

          </div>

        </section>

        {/* ACTIONS */}

        <div className="profile-form-actions">

          {saved && (
            <span className="profile-saved-message">
              ✓ Information saved
            </span>
          )}

          <button
            type="submit"
            className="save-profile-button"
          >
            Save Information
          </button>

        </div>

      </form>

    </main>
  )
}

export default EditProfile