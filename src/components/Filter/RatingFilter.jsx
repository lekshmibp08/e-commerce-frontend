import FilterSection from "./FilterSection"
import StarRating from "../UI/StarRating"

const RatingFilter = ({ selectedRating, onRatingChange }) => {
  const ratings = [5, 4, 3, 2, 1]

  return (
    <FilterSection title="Rating">
      <div className="rating-options">
        {ratings.map((rating) => (
          <div
            key={rating}
            className={`rating-option ${selectedRating === rating.toString() ? "selected" : ""}`}
            onClick={() => onRatingChange(rating.toString())}
          >
            <StarRating rating={rating} />
          </div>
        ))}
      </div>
    </FilterSection>
  )
}

export default RatingFilter
