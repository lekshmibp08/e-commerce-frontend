import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../UI/Logo"
import SearchBar from "../UI/SearchBar"
import NavLinks from "./NavLinks"
import MobileNav from "./MobileNav"
import { useAuth } from "../../hooks/useAuth"
import "./Navbar.css"

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  const handleSearch = (term) => {
    if (term.trim()) {
      navigate(`/products?search=${encodeURIComponent(term)}`)
    }
  }

  const handleCartClick = () => {
    navigate(isLoggedIn ? "/cart" : "/login")
  }

  const handleLogin = () => navigate("/login")

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-desktop">
          <div className="navbar-left">
            <Logo />
            <SearchBar onSearch={handleSearch} />
          </div>
          <NavLinks onCartClick={handleCartClick} onLogin={handleLogin} onLogout={logout} isLoggedIn={isLoggedIn} />
        </div>
        <MobileNav onCartClick={handleCartClick} onLogin={handleLogin} onLogout={logout} isLoggedIn={isLoggedIn} />
      </div>
    </nav>
  )
}

export default Navbar
