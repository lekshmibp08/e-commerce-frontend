import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("token")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate("/cart")
    } else {
      navigate("/login")
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Desktop Layout */}
        <div className="desktop-navbar">
          {/* Left Section - Logo and Search */}
          <div className="navbar-left">
            <Link to="/" className="logo">
              <div className="logo-icon"></div>
              <span className="logo-text">Logo Here</span>
            </Link>

            <form onSubmit={handleSearch} className="search-form">
              <div className="search-container">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search Here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="navbar-right">
            <div className="nav-links">
              <div className="nav-item">
                <span className="nav-text">Zoffi</span>
                <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="nav-text">Become a Seller</span>
              <div className="nav-item">
                <span className="nav-text">More</span>
                <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <button onClick={handleCartClick} className="nav-text cart-btn">
                Cart
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="mobile-navbar">
          <Link to="/" className="mobile-logo">
            <div className="mobile-logo-icon"></div>
            <span className="mobile-logo-text">Logo Here</span>
          </Link>

          <div className="mobile-nav-icons">
            <button className="mobile-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="mobile-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button className="mobile-icon-btn" onClick={handleCartClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19S21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
