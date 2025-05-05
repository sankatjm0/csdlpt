"use client"
import "./css/SearchFilter.css"

function SearchFilter({ branches, searchTerm, setSearchTerm, selectedBranch, setSelectedBranch }) {
    return (
        <div className="search-filter">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc mã NV..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-container">
                <label>Lọc theo chi nhánh:</label>
                <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                    <option value="">Tất cả chi nhánh</option>
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
