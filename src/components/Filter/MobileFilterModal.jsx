"use client"

import Modal from "../UI/Modal"
import FilterSidebar from "./FilterSidebar"

const MobileFilterModal = ({ isOpen, onClose, filters, onFilterChange }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters" size="sm">
      <FilterSidebar filters={filters} onFilterChange={onFilterChange} />
    </Modal>
  )
}

export default MobileFilterModal
