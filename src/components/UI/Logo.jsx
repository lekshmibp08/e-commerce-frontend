import { useNavigate } from "react-router-dom"
import "./Logo.css"

const Logo = ({ size = "md" }) => {
  const navigate = useNavigate()

  return (
    <div className={`logo logo-${size}`} onClick={() => navigate("/")}>
      <div className="logo-icon"></div>
      <span className="logo-text">Logo Here</span>
    </div>
  )
}

export default Logo
