"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import StarRating from "../components/UI/StarRating"
import Button from "../components/UI/Button"
import { getProductById } from "../services/api"
import "./ProductDetailPage.css"

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
    } catch (err) {
      setError("Failed to fetch product details. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.title} to cart!`)
  }

  if (loading)
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  if (error) return <div className="error">{error}</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">›</span>
          <Link to="/products">Products</Link>
          <span className="separator">›</span>
          <span className="category">{product.category}</span>
          <span className="separator">›</span>
          <span>{product.title}</span>
        </div>

        <div className="product-detail-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.image || "/placeholder.svg"} alt={product.title} />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-category">{product.category}</div>
            <h1 className="product-title">{product.title}</h1>

            {product.rating && (
              <div className="product-rating">
                <StarRating rating={product.rating.rate} size="md" />
                <span className="rating-text">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="product-price">${product.price}</div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number.parseInt(e.target.value))}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="action-buttons">
                <Button variant="outline" size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="primary" size="lg">
                  Buy Now
                </Button>
              </div>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy</li>
                <li>1-year warranty</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
