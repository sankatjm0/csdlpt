"use client"

import { useState, useEffect } from "react"
import EmployeeList from "./components/EmployeeList.js"
import EmployeeForm from "./components/EmployeeForm.js"
import SearchFilter from "./components/SearchFilter.js"
import "./App.css"

function App() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [positions, setPositions] = useState([])
  const [branches, setBranches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // API URL - sửa nếu chỉnh port backend
  const API_URL = "http://localhost:5001/api"

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Lấy danh sách nhân viên
        const employeesResponse = await fetch(`${API_URL}/employees`)
        if (!employeesResponse.ok) {
          throw new Error("Không thể lấy dữ liệu nhân viên")
        }
        const employeesData = await employeesResponse.json()

        // Lấy danh sách chi nhánh
        const branchesResponse = await fetch(`${API_URL}/branches`)
        if (!branchesResponse.ok) {
          throw new Error("Không thể lấy dữ liệu chi nhánh")
        }
        const branchesData = await branchesResponse.json()

        // Lấy danh sách chức vụ
        const positionsResponse = await fetch(`${API_URL}/positions`)
        if (!positionsResponse.ok) {
          throw new Error("Không thể lấy dữ liệu chức vụ")
        }
        const positionsData = await positionsResponse.json()

        setEmployees(employeesData)
        setFilteredEmployees(employeesData)
        setBranches(branchesData)
        setPositions(positionsData)
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
    let result = employees

    if (searchTerm) {
      result = result.filter(
          (employee) =>
              employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              employee.employee_id.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedBranch) {
      result = result.filter((employee) => employee.branch_id.toString() === selectedBranch)
    }

    setFilteredEmployees(result)
  }, [employees, searchTerm, selectedBranch])

  const addEmployee = async (employee) => {
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      })

      if (!response.ok) {
        throw new Error("Không thể thêm nhân viên")
      }

      const newEmployee = await response.json()

      // Find the branch name for the new employee
      const branch = branches.find(b => b.id === parseInt(newEmployee.branch_id))
      newEmployee.branch_name = branch ? branch.name : newEmployee.branch_id

      // Cập nhật danh sách nhân viên
      const updatedEmployees = [...employees, newEmployee]
      setEmployees(updatedEmployees)
      setIsFormOpen(false)
    } catch (err) {
      console.error("Lỗi khi thêm nhân viên:", err)
      alert("Lỗi khi thêm nhân viên: " + err.message)
    }
  }

  const updateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch(`${API_URL}/employees/${updatedEmployee.employee_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      })

      if (!response.ok) {
        throw new Error("Không thể cập nhật nhân viên")
      }

      const updated = await response.json()

      const branch = branches.find(b => b.id === parseInt(updated.branch_id))
      updated.branch_name = branch ? branch.name : updated.branch_id

      setEmployees(employees.map((emp) => (emp.employee_id === updated.employee_id ? updated : emp)))
      setSelectedEmployee(null)
      setIsFormOpen(false)
    } catch (err) {
      console.error("Lỗi khi cập nhật nhân viên:", err)
      alert("Lỗi khi cập nhật nhân viên: " + err.message)
    }
  }

  const deleteEmployee = async (employeeId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        const response = await fetch(`${API_URL}/employees/${employeeId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Không thể xóa nhân viên")
        }

        setEmployees(employees.filter((emp) => emp.employee_id !== employeeId))
      } catch (err) {
        console.error("Lỗi khi xóa nhân viên:", err)
        alert("Lỗi khi xóa nhân viên: " + err.message)
      }
    }
  }

  const editEmployee = (employee) => {
    setSelectedEmployee(employee)
    setIsFormOpen(true)
  }

  const openAddForm = () => {
    setSelectedEmployee(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedEmployee(null)
  }

  if (isLoading) {
    return <div className="loading">Đang tải dữ liệu...</div>
  }

  if (error) {
    return <div className="error">Lỗi: {error}</div>
  }

  return (
      <div className="app-container">
        <h1>Quản Lý Nhân Viên</h1>

        <SearchFilter
            branches={branches}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
        />

        <div className="action-buttons">
          <button className="add-button" onClick={openAddForm}>
            Thêm Nhân Viên
          </button>
        </div>

        <EmployeeList employees={filteredEmployees} onEdit={editEmployee} onDelete={deleteEmployee} />

        {isFormOpen && (
            <div className="modal-overlay">
              <EmployeeForm
                  employee={selectedEmployee}
                  positions={positions}
                  branches={branches}
                  onSave={selectedEmployee ? updateEmployee : addEmployee}
                  onCancel={closeForm}
              />
            </div>
        )}
      </div>
  )
}

export default App