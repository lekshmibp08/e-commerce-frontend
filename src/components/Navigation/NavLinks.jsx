import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi"
import Dropdown from "../UI/Dropdown"

const NavLinks = ({ onCartClick, onLogin, onLogout, isLoggedIn }) => {
  const moreItems = [
    {
      icon: isLoggedIn ? FiLogOut : FiUser,
      label: isLoggedIn ? "Logout" : "Login",
      onClick: isLoggedIn ? onLogout : onLogin,
    },
  ]

  return (
    <div className="nav-links">
      <div className="nav-item">
        <span>Zoffi</span>
        <FiChevronDown />
      </div>

      <span className="nav-text">Become a Seller</span>

      <Dropdown
        trigger={
          <div className="nav-item">
            <span>More</span>
            <FiChevronDown />
          </div>
        }
        items={moreItems}
      />

      <button onClick={onCartClick} className="nav-text cart-button">
        Cart
      </button>
    </div>
  )
}

export default NavLinks
