
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Button from "./Button"
import "./Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  // Previous button
  pages.push(
    <Button
      key="prev"
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <FiChevronLeft />
    </Button>,
  )

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Button key={i} variant={currentPage === i ? "primary" : "outline"} size="sm" onClick={() => onPageChange(i)}>
        {i}
      </Button>,
    )
  }

  // Next button
  pages.push(
    <Button
      key="next"
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <FiChevronRight />
    </Button>,
  )

  return <div className="pagination">{pages}</div>
}

export default Pagination
