import { useEffect } from "react"
import { FiX } from "react-icons/fi"
import "./Modal.css"

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className={`modal modal-${size}`}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
