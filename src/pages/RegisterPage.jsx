
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/UI/Button"
import { registerUser } from "../services/api"
import "./AuthPages.css"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: { lat: "", long: "" },
    },
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      if (parent === "name") {
        setFormData({
          ...formData,
          name: { ...formData.name, [child]: value },
        })
      } else if (parent === "address") {
        setFormData({
          ...formData,
          address: { ...formData.address, [child]: value },
        })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await registerUser(formData)
      setSuccess(true)
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="success-message">
            <h2>Registration Successful!</h2>
            <p>Your account has been created. Redirecting to login...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join us today! Please fill in your information.</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="name.firstname"
                  value={formData.name.firstname}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="name.lastname"
                  value={formData.name.lastname}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
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
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter your city"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code</label>
                <input
                  type="text"
                  id="zipcode"
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                  required
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading} className="auth-button">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
