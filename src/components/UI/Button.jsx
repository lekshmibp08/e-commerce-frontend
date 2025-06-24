
import "./Button.css"

const Button = ({
  children,
  variant = "default",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
