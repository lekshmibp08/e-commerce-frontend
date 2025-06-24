"use client"

import { FiHeart } from "react-icons/fi"
import { Link } from "react-router-dom"
import StarRating from "../UI/StarRating"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const { id, title, price, image, rating, category } = product

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">
        <div className="product-image-container">
          <img src={image || "/placeholder.svg"} alt={title} className="product-image" />
          <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>
            <FiHeart />
          </button>
        </div>

        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-description">Your perfect pack for everyday use...</p>
          <div className="product-price">₹ {price.toFixed(2)}</div>

          {rating && (
            <div className="product-rating">
              <StarRating rating={rating.rate} />
              <span className="rating-count">({rating.count})</span>
            </div>
          )}

          <div className="product-category">{category}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
