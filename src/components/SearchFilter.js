"use client"

import "./SearchFilter.css"

function SearchFilter({ branches, searchTerm, setSearchTerm, selectedBranch, setSelectedBranch }) {
  return (
    <div className="search-filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, mã hoặc địa chỉ căn hộ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filter-container">
        <label>Chi nhánh:</label>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Tất cả</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SearchFilter
