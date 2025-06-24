
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
          <div
            key={category.name}
            className={`filter-option-row ${selectedCategory === category.name ? "selected" : ""}`}
            onClick={() => onCategoryChange(category.name)}
          >
            <span className="category-name">
              {category.name} <span className="category-count">({category.count})</span>
            </span>
            {selectedCategory === category.name && <FiCheck className="category-check" />}
          </div>
        ))}
      </div>
    </FilterSection>
  )
}

export default CategoryFilter
