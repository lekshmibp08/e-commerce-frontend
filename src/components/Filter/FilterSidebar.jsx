
import { useState, useEffect } from "react"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"
import { getAllProducts } from "../../services/api"
import "./FilterSidebar.css"

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const products = await getAllProducts()
      const categoryMap = new Map()

      products.forEach((product) => {
        const category = product.category
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
      })

      const categoryOptions = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      }))

      setCategories(categoryOptions)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <span className="filter-title">Filter</span>
        <span className="filter-advanced">Advanced</span>
      </div>

      {!loading && (
        <>
          <CategoryFilter
            categories={categories}
            selectedCategory={filters.category}
            onCategoryChange={(category) =>
              onFilterChange({ ...filters, category: filters.category === category ? "all" : category })
            }
          />

          <PriceFilter
            minPrice={filters.minPrice || 0}
            maxPrice={filters.maxPrice || 50000}
            onPriceChange={(min, max) => onFilterChange({ ...filters, minPrice: min, maxPrice: max })}
          />

          <RatingFilter
            selectedRating={filters.rating}
            onRatingChange={(rating) => onFilterChange({ ...filters, rating: filters.rating === rating ? "" : rating })}
          />
        </>
      )}
    </div>
  )
}

export default FilterSidebar
