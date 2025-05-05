"use client"
import "./css/EmployeeList.css"

function normalizeStatus(status) {
    return status.normalize("NFC").replace(/^Ð/, "Đ").trim()
}

function EmployeeList({ employees, onEdit, onDelete }) {
    return (
        <div className="employee-list">
            <table>
                <thead>
                <tr>
                    <th>Mã NV</th>
                    <th>Tên Nhân Viên</th>
                    <th>Chức Vụ</th>
                    <th>Ngày Sinh</th>
                    <th>Số Điện Thoại</th>
                    <th>Chi Nhánh</th>
                    <th>Ngày Vào Làm</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <tr key={employee.employee_id}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{formatDate(employee.birthday)}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.branch_name || employee.branch_id}</td>
                            <td>{formatDate(employee.joinedtime)}</td>
                            <td>
                                <span
                                    className={`status-badge ${normalizeStatus(employee.status) === "Đang làm" ? "active" : "inactive"}`}
                                >
                                    {employee.status}
                                </span>
                            </td>
                            <td className="action-cell">
                                <button className="edit-button" onClick={() => onEdit(employee)}>
                                    Sửa
                                </button>
                                <button className="delete-button" onClick={() => onDelete(employee.employee_id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="no-data">
                            Không có dữ liệu
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

function formatDate(dateString) {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
}

export default EmployeeList