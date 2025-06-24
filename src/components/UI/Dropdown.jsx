import { useState, useRef, useEffect } from "react"
import "./Dropdown.css"

const Dropdown = ({ trigger, items, align = "left" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div className={`dropdown-menu dropdown-${align}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
            >
              {item.icon && <item.icon className="dropdown-icon" />}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
