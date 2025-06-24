"use client"

import { useState } from "react"
import { FiSearch, FiCheck } from "react-icons/fi"
import FilterSection from "./FilterSection"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <FilterSection title="Category">
      <div className="filter-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-options">
        {filteredCategories.map((category) => (
          <label key={category.name} className="filter-option">
            <div className="option-content">
              <span className="option-text">{category.name}</span>
              <span className="option-count">{category.count}</span>
            </div>
            <div className="option-check">
              {selectedCategory === category.name && <FiCheck className="check-icon" />}
            </div>
            <input
              type="checkbox"
              checked={selectedCategory === category.name}
              onChange={() => onCategoryChange(category.name)}
              style={{ display: "none" }}
            />
          </label>
        ))}
      </div>
    </FilterSection>
  )
}

export default CategoryFilter
