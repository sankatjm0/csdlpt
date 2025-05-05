"use client"

import { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import {
    fetchEmployees,
    fetchBranches,
    fetchPositions,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../api/employeeService.js"

// Tạo context
const EmployeeContext = createContext()

// Initial state
const initialState = {
    employees: [],
    filteredEmployees: [],
    branches: [],
    positions: [],
    isLoading: true,
    error: null,
    searchTerm: "",
    selectedBranch: "",
}

// Action types
const ACTIONS = {
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    SET_EMPLOYEES: "SET_EMPLOYEES",
    SET_BRANCHES: "SET_BRANCHES",
    SET_POSITIONS: "SET_POSITIONS",
    SET_FILTERED_EMPLOYEES: "SET_FILTERED_EMPLOYEES",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_SELECTED_BRANCH: "SET_SELECTED_BRANCH",
}

// Reducer function
function employeeReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload }
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload }
        case ACTIONS.SET_EMPLOYEES:
            return { ...state, employees: action.payload }
        case ACTIONS.SET_BRANCHES:
            return { ...state, branches: action.payload }
        case ACTIONS.SET_POSITIONS:
            return { ...state, positions: action.payload }
        case ACTIONS.SET_FILTERED_EMPLOYEES:
            return { ...state, filteredEmployees: action.payload }
        case ACTIONS.SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload }
        case ACTIONS.SET_SELECTED_BRANCH:
            return { ...state, selectedBranch: action.payload }
        default:
            return state
    }
}

// Provider component
export function EmployeeProvider({ children }) {
    const [state, dispatch] = useReducer(employeeReducer, initialState)

    // Fetch all data
    const fetchData = useCallback(async () => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true })
        dispatch({ type: ACTIONS.SET_ERROR, payload: null })

        try {
            const employeesData = await fetchEmployees()
            const branchesData = await fetchBranches()
            const positionsData = await fetchPositions()

            // Enrich employee data with branch names
            const enrichedEmployees = employeesData.map((employee) => {
                const branch = branchesData.find((b) => b.id === Number.parseInt(employee.branch_id))
                return {
                    ...employee,
                    branch_name: branch ? branch.name : employee.branch_id,
                }
            })

            dispatch({ type: ACTIONS.SET_EMPLOYEES, payload: enrichedEmployees })
            dispatch({ type: ACTIONS.SET_FILTERED_EMPLOYEES, payload: enrichedEmployees })
            dispatch({ type: ACTIONS.SET_BRANCHES, payload: branchesData })
            dispatch({ type: ACTIONS.SET_POSITIONS, payload: positionsData })
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu:", err)

            if (err.message.includes("Failed to fetch")) {
                dispatch({
                    type: ACTIONS.SET_ERROR,
                    payload: "Không thể kết nối đến máy chủ API. Vui lòng kiểm tra xem máy chủ có đang chạy không và thử lại.",
                })
            } else {
                dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
            }
        } finally {
            dispatch({ type: ACTIONS.SET_LOADING, payload: false })
        }
    }, [])

    // Filter employees
    const filterEmployees = useCallback(() => {
        const { employees, searchTerm, selectedBranch } = state
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

        dispatch({ type: ACTIONS.SET_FILTERED_EMPLOYEES, payload: result })
    }, [state])

    // Set search term
    const setSearchTerm = (term) => {
        dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term })
    }

    // Set selected branch
    const setSelectedBranch = (branch) => {
        dispatch({ type: ACTIONS.SET_SELECTED_BRANCH, payload: branch })
    }

    // Add employee
    const addNewEmployee = async (employee) => {
        try {
            await addEmployee(employee)
            await fetchData()
            return { success: true }
        } catch (err) {
            console.error("Lỗi khi thêm nhân viên:", err)
            return { success: false, error: err.message }
        }
    }

    // Update employee
    const updateExistingEmployee = async (employee) => {
        try {
            await updateEmployee(employee)
            await fetchData()
            return { success: true }
        } catch (err) {
            console.error("Lỗi khi cập nhật nhân viên:", err)
            return { success: false, error: err.message }
        }
    }

    // Delete employee
    const deleteExistingEmployee = async (employeeId) => {
        try {
            await deleteEmployee(employeeId)
            await fetchData()
            return { success: true }
        } catch (err) {
            console.error("Lỗi khi xóa nhân viên:", err)
            return { success: false, error: err.message }
        }
    }

    // Apply filters when search term or branch selection changes
    useEffect(() => {
        filterEmployees()
    }, [state.searchTerm, state.selectedBranch, state.employees, filterEmployees])

    // Initial data fetch
    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Context value
    const value = {
        ...state,
        refreshData: fetchData,
        setSearchTerm,
        setSelectedBranch,
        addEmployee: addNewEmployee,
        updateEmployee: updateExistingEmployee,
        deleteEmployee: deleteExistingEmployee,
    }

    return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

// Custom hook to use the context
export function useEmployeeContext() {
    const context = useContext(EmployeeContext)
    if (context === undefined) {
        throw new Error("useEmployeeContext must be used within an EmployeeProvider")
    }
    return context
}
