"use client"

import { useState } from "react"
import FilterSection from "./FilterSection"

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])

  const handleSliderChange = (values) => {
    setPriceRange(values)
    onPriceChange(values[0], values[1])
  }

  return (
    <FilterSection title="Price">
      <div className="price-histogram">
        <div className="bar" style={{ height: "30%" }}></div>
        <div className="bar" style={{ height: "45%" }}></div>
        <div className="bar" style={{ height: "60%" }}></div>
        <div className="bar" style={{ height: "80%" }}></div>
        <div className="bar" style={{ height: "100%" }}></div>
        <div className="bar" style={{ height: "90%" }}></div>
        <div className="bar" style={{ height: "70%" }}></div>
        <div className="bar" style={{ height: "50%" }}></div>
        <div className="bar" style={{ height: "35%" }}></div>
        <div className="bar" style={{ height: "25%" }}></div>
      </div>

      <div className="price-slider-container">
        <div className="slider-track">
          <div
            className="slider-range"
            style={{
              left: `${(priceRange[0] / 50000) * 100}%`,
              width: `${((priceRange[1] - priceRange[0]) / 50000) * 100}%`,
            }}
          ></div>
        </div>
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange[0]}
          onChange={(e) => handleSliderChange([Number.parseInt(e.target.value), priceRange[1]])}
          className="price-slider price-slider-min"
        />
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange[1]}
          onChange={(e) => handleSliderChange([priceRange[0], Number.parseInt(e.target.value)])}
          className="price-slider price-slider-max"
        />
      </div>

      <div className="price-labels">
        <span>{priceRange[0].toLocaleString()} INR</span>
        <span>{priceRange[1].toLocaleString()} INR</span>
      </div>

      <div className="price-inputs">
        <input
          type="text"
          value={`${priceRange[0].toLocaleString()} INR`}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d]/g, "")
            handleSliderChange([Number.parseInt(value) || 0, priceRange[1]])
          }}
          className="price-input"
          placeholder="29,000 INR"
        />
        <input
          type="text"
          value={`${priceRange[1].toLocaleString()} INR`}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d]/g, "")
            handleSliderChange([priceRange[0], Number.parseInt(value) || 50000])
          }}
          className="price-input"
          placeholder="29,000 INR"
        />
      </div>
    </FilterSection>
  )
}

export default PriceFilter
