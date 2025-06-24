"use client"

import { FiCheck } from "react-icons/fi"
import FilterSection from "./FilterSection"
import StarRating from "../UI/StarRating"

const RatingFilter = ({ selectedRating, onRatingChange }) => {
  const ratings = [5, 4, 3, 2, 1]

  return (
    <FilterSection title="Rating">
      <div className="rating-options">
        {ratings.map((rating) => (
          <label key={rating} className="rating-option">
            <input
              type="checkbox"
              checked={selectedRating === rating.toString()}
              onChange={() => onRatingChange(rating.toString())}
            />
            <span className="checkmark">{selectedRating === rating.toString() && <FiCheck />}</span>
            <StarRating rating={rating} />
          </label>
        ))}
      </div>
    </FilterSection>
  )
}

export default RatingFilter
