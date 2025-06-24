import "./StarRating.css"

const StarRating = ({ rating, size = "sm" }) => {
  const stars = []
  const fullStars = Math.floor(rating)

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`star star-${size} ${i < fullStars ? "filled" : ""}`}>
        ★
      </span>,
    )
  }

  return <div className="star-rating">{stars}</div>
}

export default StarRating
