import {useState} from 'react'
import './App.css'

const getApiBaseUrl = () => {
  const customBaseUrl = process.env.REACT_APP_API_BASE_URL
  if (customBaseUrl) {
    return customBaseUrl
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:8080'
  }

  const {protocol, hostname} = window.location
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8080'
  }

  // Support GitHub Codespaces style hostnames where 3000 and 8080 are different subdomains.
  if (hostname.includes('-3000.')) {
    return `${protocol}//${hostname.replace('-3000.', '-8080.')}`
  }

  return `${protocol}//${hostname}:8080`
}

const LOGIN_API_URL = `${getApiBaseUrl()}/api/auth/login`

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profile, setProfile] = useState(null)

  const onSubmitLogin = async event => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      const contentType = response.headers.get('content-type') || ''
      let parsedBody = null

      if (contentType.includes('application/json')) {
        try {
          parsedBody = await response.json()
        } catch {
          parsedBody = null
        }
      } else {
        try {
          const text = await response.text()
          parsedBody = text ? {message: text} : null
        } catch {
          parsedBody = null
        }
      }

      if (!response.ok) {
        const message =
          parsedBody && typeof parsedBody === 'object' && 'message' in parsedBody && parsedBody.message
            ? parsedBody.message
            : 'Authentication failed'
        throw new Error(message)
      }

      if (!parsedBody) {
        throw new Error('Unexpected response from server')
      }

      setProfile(parsedBody)
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setErrorMessage(`Unable to reach backend at ${LOGIN_API_URL}`)
      } else {
        setErrorMessage(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const onLogout = () => {
    setProfile(null)
    setUsername('')
    setPassword('')
    setErrorMessage('')
  }

  if (profile) {
    return (
      <main className="app-container">
        <section className="dashboard-card">
          <h1 className="dashboard-title">User Dashboard</h1>
          <p className="dashboard-text">
            <span className="profile-label">Full Name:</span> {profile.fullName}
          </p>
          <p className="dashboard-text">
            <span className="profile-label">Username:</span> {profile.username}
          </p>
          <p className="dashboard-text">
            <span className="profile-label">Email:</span> {profile.email}
          </p>
          <button className="submit-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-container">
      <form className="login-card" onSubmit={onSubmitLogin}>
        <h1 className="form-title">Login</h1>
        <label className="input-label" htmlFor="username">
          User Name
        </label>
        <input
          id="username"
          className="text-input"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder="Enter username"
          required
        />

        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="text-input"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Enter password"
          required
        />

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </form>
    </main>
  )
}

export default App
