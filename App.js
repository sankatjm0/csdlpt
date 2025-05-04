"use client"

import { useState, useEffect } from "react"
import ApartmentList from "./components/ApartmentList.js"
import ApartmentForm from "./components/ApartmentForm.js"
import SearchFilter from "./components/SearchFilter.js"
import "./App.css"

function App() {
  const [apartments, setApartments] = useState([])
  const [filteredApartments, setFilteredApartments] = useState([])
  const [selectedApartment, setSelectedApartment] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [statuses, setStatuses] = useState([])
  const [branches, setBranches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // API URL - sửa nếu chỉnh port backend
  const API_URL = "http://localhost:5001/api"

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Lấy danh sách căn hộ
        const apartmentsResponse = await fetch(`${API_URL}/apartments`)
        if (!apartmentsResponse.ok) {
          throw new Error("Không thể lấy dữ liệu căn hộ")
        }
        const apartmentsData = await apartmentsResponse.json()

        // Lấy danh sách chi nhánh
        const branchesResponse = await fetch(`${API_URL}/branches`)
        if (!branchesResponse.ok) {
          throw new Error("Không thể lấy dữ liệu chi nhánh")
        }
        const branchesData = await branchesResponse.json()

        // Lấy danh sách trạng thái
        const statusesResponse = await fetch(`${API_URL}/statuses`)
        if (!statusesResponse.ok) {
          throw new Error("Không thể lấy dữ liệu trạng thái")
        }
        const statusesData = await statusesResponse.json()

        setApartments(apartmentsData)
        setFilteredApartments(apartmentsData)
        setBranches(branchesData)
        setStatuses(statusesData)
      } catch (err) {
        setError(err.message)
        console.error("Lỗi khi lấy dữ liệu:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Lọc theo chi nhánh
  useEffect(() => {
    let result = apartments

    if (searchTerm) {
      result = result.filter(
        (apartment) =>
          apartment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apartment.apartment_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          apartment.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedBranch) {
      result = result.filter((apartment) => apartment.branch_id.toString() === selectedBranch)
    }

    setFilteredApartments(result)
  }, [apartments, searchTerm, selectedBranch])

  const addApartment = async (apartment) => {
    try {
      const response = await fetch(`${API_URL}/apartments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apartment),
      })

      if (!response.ok) {
        throw new Error("Không thể thêm căn hộ")
      }

      const newApartment = await response.json()

      // Find the branch name for the new apartment
      const branch = branches.find((b) => b.id === Number.parseInt(newApartment.branch_id))
      newApartment.branch_name = branch ? branch.name : newApartment.branch_id

      // Cập nhật danh sách căn hộ
      const updatedApartments = [...apartments, newApartment]
      setApartments(updatedApartments)
      setIsFormOpen(false)
    } catch (err) {
      console.error("Lỗi khi thêm căn hộ:", err)
      alert("Lỗi khi thêm căn hộ: " + err.message)
    }
  }

  const updateApartment = async (updatedApartment) => {
    try {
      const response = await fetch(`${API_URL}/apartments/${updatedApartment.apartment_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApartment),
      })

      if (!response.ok) {
        throw new Error("Không thể cập nhật căn hộ")
      }

      const updated = await response.json()

      const branch = branches.find((b) => b.id === Number.parseInt(updated.branch_id))
      updated.branch_name = branch ? branch.name : updated.branch_id

      setApartments(apartments.map((apt) => (apt.apartment_id === updated.apartment_id ? updated : apt)))
      setSelectedApartment(null)
      setIsFormOpen(false)
    } catch (err) {
      console.error("Lỗi khi cập nhật căn hộ:", err)
      alert("Lỗi khi cập nhật căn hộ: " + err.message)
    }
  }

  const deleteApartment = async (apartmentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa căn hộ này?")) {
      try {
        const response = await fetch(`${API_URL}/apartments/${apartmentId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Không thể xóa căn hộ")
        }

        setApartments(apartments.filter((apt) => apt.apartment_id !== apartmentId))
      } catch (err) {
        console.error("Lỗi khi xóa căn hộ:", err)
        alert("Lỗi khi xóa căn hộ: " + err.message)
      }
    }
  }

  const editApartment = (apartment) => {
    setSelectedApartment(apartment)
    setIsFormOpen(true)
  }

  const openAddForm = () => {
    setSelectedApartment(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedApartment(null)
  }

  if (isLoading) {
    return <div className="loading">Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div className="error">Lỗi: {error}</div>
  }

  return (
    <div className="app-container">
      <h1>Quản Lý Căn Hộ</h1>

      <SearchFilter
        branches={branches}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      <div className="action-buttons">
        <button className="add-button" onClick={openAddForm}>
          Thêm Căn Hộ
        </button>
      </div>

      <ApartmentList apartments={filteredApartments} onEdit={editApartment} onDelete={deleteApartment} />

      {isFormOpen && (
        <div className="modal-overlay">
          <ApartmentForm
            apartment={selectedApartment}
            statuses={statuses}
            branches={branches}
            onSave={selectedApartment ? updateApartment : addApartment}
            onCancel={closeForm}
          />
        </div>
      )}
    </div>
  )
}

export default App
