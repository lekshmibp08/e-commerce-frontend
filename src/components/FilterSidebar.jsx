"use client"

import { useState, useEffect } from "react"
import { getAllProducts } from "../services/api"
import "../styles/FilterSidebar.css"

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [ratingOpen, setRatingOpen] = useState(true)
  const [priceRange, setPriceRange] = useState([20, 29000])
  const [minInput, setMinInput] = useState("29,000 INR")
  const [maxInput, setMaxInput] = useState("29,000 INR")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const products = await getAllProducts()
      const uniqueCategories = [...new Set(products.map((product) => product.category))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category })
  }

  const handlePriceSliderChange = (values) => {
    setPriceRange(values)
    setMinInput(`${values[0].toLocaleString()} INR`)
    setMaxInput(`${values[1].toLocaleString()} INR`)
    onFilterChange({ ...filters, minPrice: values[0], maxPrice: values[1] })
  }

  const handleMinInputChange = (value) => {
    setMinInput(value)
    const numValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    if (!Number.isNaN(numValue)) {
      const newRange = [numValue, priceRange[1]]
      setPriceRange(newRange)
      onFilterChange({ ...filters, minPrice: numValue, maxPrice: priceRange[1] })
    }
  }

  const handleMaxInputChange = (value) => {
    setMaxInput(value)
    const numValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    if (!Number.isNaN(numValue)) {
      const newRange = [priceRange[0], numValue]
      setPriceRange(newRange)
      onFilterChange({ ...filters, minPrice: priceRange[0], maxPrice: numValue })
    }
  }

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating: filters.rating === rating ? "" : rating })
  }

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <button className="filter-btn">Filter</button>
        <button className="advanced-btn">Advanced</button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <button className="filter-section-header" onClick={() => setCategoryOpen(!categoryOpen)}>
          <span>Category</span>
          <svg
            className={`chevron ${categoryOpen ? "open" : ""}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {categoryOpen && (
          <div className="filter-content">
            <div className="search-container">
              <svg className="search-icon-small" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <input type="text" placeholder="Search brand.." className="search-input-small" />
            </div>

            <div className="filter-options">
              {loading ? (
                <div className="loading-text">Loading...</div>
              ) : (
                categories.map((category) => (
                  <label key={category} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.category === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="checkmark">
                      {filters.category === category && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="option-text">{category}</span>
                    <span className="option-count">123</span>
                  </label>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <button className="filter-section-header" onClick={() => setPriceOpen(!priceOpen)}>
          <span>Price</span>
          <svg className={`chevron ${priceOpen ? "open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {priceOpen && (
          <div className="filter-content">
            <div className="price-range">
              {/* Histogram Background */}
              <div className="price-histogram">
                <div className="bar" style={{ height: "20%" }}></div>
                <div className="bar" style={{ height: "30%" }}></div>
                <div className="bar" style={{ height: "50%" }}></div>
                <div className="bar" style={{ height: "80%" }}></div>
                <div className="bar" style={{ height: "100%" }}></div>
                <div className="bar" style={{ height: "90%" }}></div>
                <div className="bar" style={{ height: "60%" }}></div>
                <div className="bar" style={{ height: "40%" }}></div>
                <div className="bar" style={{ height: "25%" }}></div>
                <div className="bar" style={{ height: "15%" }}></div>
              </div>

              {/* Dual Range Slider */}
              <div className="price-slider-container">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceSliderChange([Number.parseInt(e.target.value), priceRange[1]])}
                  className="price-slider price-slider-min"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceSliderChange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="price-slider price-slider-max"
                />
                <div className="slider-track">
                  <div
                    className="slider-range"
                    style={{
                      left: `${(priceRange[0] / 50000) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 50000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="price-labels">
                <span>{priceRange[0].toLocaleString()} INR</span>
                <span>{priceRange[1].toLocaleString()} INR</span>
              </div>
            </div>

            <div className="price-inputs">
              <input
                type="text"
                value={minInput}
                onChange={(e) => handleMinInputChange(e.target.value)}
                className="price-input"
              />
              <span className="price-separator">to</span>
              <div className="max-input-container">
                <input
                  type="text"
                  value={maxInput}
                  onChange={(e) => handleMaxInputChange(e.target.value)}
                  className="price-input"
                  placeholder="Max"
                />
                <span className="currency-symbol">₹</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="filter-section">
        <button className="filter-section-header" onClick={() => setRatingOpen(!ratingOpen)}>
          <span>Rating</span>
          <svg className={`chevron ${ratingOpen ? "open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {ratingOpen && (
          <div className="filter-content">
            <div className="rating-options">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="rating-option">
                  <input
                    type="checkbox"
                    checked={filters.rating === rating.toString()}
                    onChange={() => handleRatingChange(rating.toString())}
                  />
                  <span className="rating-checkmark">
                    {filters.rating === rating.toString() && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar
