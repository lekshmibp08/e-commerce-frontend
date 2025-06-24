"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { FiGrid, FiList, FiFilter } from "react-icons/fi"
import FilterSidebar from "../components/Filter/FilterSidebar"
import ProductCard from "../components/Product/ProductCard"
import MobileFilterModal from "../components/Filter/MobileFilterModal"
import Button from "../components/UI/Button"
import Pagination from "../components/UI/Pagination"
import { getAllProducts } from "../services/api"
import "./ProductListPage.css"

const ProductListPage = () => {
  const [searchParams] = useSearchParams()
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: "all",
    minPrice: 0,
    maxPrice: 50000,
    rating: "",
  })

  const productsPerPage = 6

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
    setCurrentPage(1)
  }, [allProducts, filters, sortBy])

  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      setFilters((prev) => ({ ...prev, search: searchQuery }))
    }
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts()
      setAllProducts(data)
    } catch (err) {
      setError("Failed to fetch products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let result = [...allProducts]

    // Apply filters
    if (filters.search) {
      result = result.filter((product) => product.title.toLowerCase().includes(filters.search.toLowerCase()))
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter((product) => product.category === filters.category)
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((product) => product.price >= filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((product) => product.price <= filters.maxPrice)
    }

    if (filters.rating) {
      result = result.filter((product) => product.rating && product.rating.rate >= Number.parseFloat(filters.rating))
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "rating":
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
    }

    setFilteredProducts(result)
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  if (loading)
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  if (error) return <div className="error">{error}</div>

  return (
    <div className="product-list-page">
      <div className="hero-banner"></div>

      <div className="breadcrumb desktop-only">
        <span className="breadcrumb-home">Home</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Clothes</span>
      </div>

      <div className="container">
        <div className="page-content">
          {/* Desktop Sidebar */}
          <div className="desktop-only">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Toolbar */}
            <div className="toolbar">
              <div className="toolbar-left">
                <Button variant="outline" className="mobile-only" onClick={() => setShowMobileFilter(true)}>
                  <FiFilter /> Filter
                </Button>

                <div className="view-toggle desktop-only">
                  <Button variant="outline" size="sm">
                    <FiGrid />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FiList />
                  </Button>
                </div>
              </div>

              <div className="toolbar-right">
                <span className="sort-label">Sort by:</span>
                <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {currentProducts.length === 0 ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="product-grid">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  )
}

export default ProductListPage
