"use client"
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi"
import Logo from "../UI/Logo"
import Dropdown from "../UI/Dropdown"

const MobileNav = ({ onCartClick, onLogin, onLogout, isLoggedIn }) => {
  const userItems = [
    {
      icon: isLoggedIn ? FiUser : FiUser,
      label: isLoggedIn ? "Logout" : "Login",
      onClick: isLoggedIn ? onLogout : onLogin,
    },
  ]

  return (
    <div className="navbar-mobile">
      <Logo size="sm" />

      <div className="mobile-nav-icons">
        <button className="mobile-icon-btn">
          <FiSearch />
        </button>

        <Dropdown
          trigger={
            <button className="mobile-icon-btn">
              <FiUser />
            </button>
          }
          items={userItems}
          align="right"
        />

        <button className="mobile-icon-btn" onClick={onCartClick}>
          <FiShoppingCart />
        </button>
      </div>
    </div>
  )
}

export default MobileNav
