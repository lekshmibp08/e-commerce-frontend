"use client"

import { useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import "./FilterSection.css"

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="filter-section">
  <div className="filter-box">
    <button className="filter-section-header" onClick={() => setIsOpen(!isOpen)}>
      <span>{title}</span>
      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
    </button>
    {isOpen && <div className="filter-section-content">{children}</div>}
  </div>
</div>
  )
}

export default FilterSection
