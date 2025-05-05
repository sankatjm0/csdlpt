import { useState, useEffect } from "react"
import "./css/EmployeeForm.css"

function EmployeeForm({ employee, positions, branches, onSave, onCancel }) {
    const isEditing = !!employee

    const [formData, setFormData] = useState({
        employee_id: employee ? employee.employee_id : "",
        name: employee ? employee.name : "",
        position: employee ? employee.position : positions.length > 0 ? positions[0].name : "",
        birthday: employee ? formatDateForInput(employee.birthday) : "",
        phone: employee ? employee.phone : "",
        branch_id: employee ? employee.branch_id : branches.length > 0 ? branches[0].id : "",
        joinedtime: employee ? formatDateForInput(employee.joinedtime) : "",
        status: employee ? employee.status : "Đang làm", // Default status for new employee
    })

    useEffect(() => {
        if (employee) {
            setFormData({
                employee_id: employee.employee_id,
                name: employee.name,
                position: employee.position,
                birthday: formatDateForInput(employee.birthday),
                phone: employee.phone,
                branch_id: employee.branch_id,
                joinedtime: formatDateForInput(employee.joinedtime),
                status: employee.status,
            })
        } else if (positions.length > 0 && branches.length > 0) {
            setFormData((prev) => ({
                ...prev,
                position: positions[0].name,
                branch_id: branches[0].id,
            }))
        }
    }, [employee, positions, branches])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.phone || !formData.birthday) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc")
            return
        }

        const phoneRegex = /^[0-9]{10,11}$/
        if (!phoneRegex.test(formData.phone)) {
            alert("Số điện thoại không hợp lệ")
            return
        }

        onSave(formData)
    }

    function formatDateForInput(dateString) {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toISOString().split("T")[0]
    }

    return (
        <div className="employee-form-container">
            <div className="employee-form">
                <h2>{isEditing ? "Sửa Thông Tin Nhân Viên" : "Thêm Nhân Viên Mới"}</h2>
                <form onSubmit={handleSubmit}>
                    {isEditing && (
                        <div className="form-group uneditable">
                            <label>Mã Nhân Viên</label>
                            <input type="text" name="employee_id" value={formData.employee_id} disabled />
                        </div>
                    )}

                    <div className="form-group">
                        <label>
                            Tên Nhân Viên <span className="required">*</span>
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Chức Vụ</label>
                        <select name="position" value={formData.position} onChange={handleChange}>
                            {positions.map((position) => (
                                <option key={position.id} value={position.name}>
                                    {position.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            Ngày Sinh <span className="required">*</span>
                        </label>
                        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>
                            Số Điện Thoại <span className="required">*</span>
                        </label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Chi Nhánh</label>
                        <select name="branch_id" value={formData.branch_id} onChange={handleChange}>
                            {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {isEditing && (
                        <>
                            <div className="form-group uneditable">
                                <label>Ngày Vào Làm</label>
                                <input type="date" name="joinedtime" value={formData.joinedtime} disabled />
                            </div>

                            <div className="form-group">
                                <label>Trạng Thái</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option value="Đang làm">Đang làm</option>
                                    <option value="Nghỉ">Nghỉ</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onCancel}>
                            Hủy
                        </button>
                        <button type="submit" className="save-button">
                            {isEditing ? "Cập Nhật" : "Thêm Mới"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm
