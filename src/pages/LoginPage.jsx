import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/UI/Button"
import { loginUser } from "../services/api"
import "./AuthPages.css"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await loginUser(formData)
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify({ username: formData.username }))

      setSuccess("Login successful! Redirecting...")
      setTimeout(() => {
        navigate("/")
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError("Invalid username or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login</h2>
          <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading} className="auth-button">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
          </div>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p>
              <strong>Username:</strong> mor_2314
            </p>
            <p>
              <strong>Password:</strong> 83r5^_
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
