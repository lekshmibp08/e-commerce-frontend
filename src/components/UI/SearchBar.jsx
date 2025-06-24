"use client"

import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import "./SearchBar.css"

const SearchBar = ({ onSearch, placeholder = "Search Here..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value) // Live search
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </form>
  )
}

export default SearchBar
