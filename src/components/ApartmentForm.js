"use client"

import { useState, useEffect } from "react"
import "./ApartmentForm.css"

function normalizeStatus(status) {
  return status.normalize("NFC").replace(/^Ð/, "Đ").trim()
}

function ApartmentForm({ apartment, statuses, branches, onSave, onCancel }) {
  const isEditing = !!apartment

  const [formData, setFormData] = useState({
    apartment_id: apartment ? apartment.apartment_id : "",
    name: apartment ? apartment.name : "",
    address: apartment ? apartment.address : "",
    price: apartment ? apartment.price : "",
    branch_id: apartment ? apartment.branch_id : branches.length > 0 ? branches[0].id : "",
    photos: apartment ? apartment.photos : "",
    status: apartment ? apartment.status : "Còn trống", // Default status for new apartment
  })

  useEffect(() => {
    if (apartment) {
      setFormData({
        apartment_id: apartment.apartment_id,
        name: apartment.name,
        address: apartment.address,
        price: apartment.price,
        branch_id: apartment.branch_id,
        photos: apartment.photos,
        status: apartment.status,
      })
    } else if (branches.length > 0) {
      setFormData((prev) => ({
        ...prev,
        branch_id: branches[0].id,
      }))
    }
  }, [apartment, branches])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.address || !formData.price) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    // Validate price
    if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      alert("Giá không hợp lệ")
      return
    }

    onSave(formData)
  }

  return (
    <div className="apartment-form-container">
      <div className="apartment-form">
        <h2>{isEditing ? "Sửa Thông Tin Căn Hộ" : "Thêm Căn Hộ Mới"}</h2>
        <form onSubmit={handleSubmit}>
          {isEditing && (
            <div className="form-group uneditable">
              <label>Mã Căn Hộ</label>
              <input type="text" name="apartment_id" value={formData.apartment_id} disabled />
            </div>
          )}

          <div className="form-group">
            <label>
              Tên Căn Hộ <span className="required">*</span>
            </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>
              Địa Chỉ <span className="required">*</span>
            </label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>
              Giá <span className="required">*</span>
            </label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
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

          <div className="form-group">
            <label>Ảnh</label>
            <input
              type="text"
              name="photos"
              value={formData.photos}
              onChange={handleChange}
              placeholder="Đường dẫn ảnh"
            />
          </div>

          <div className="form-group">
            <label>Trạng Thái</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Còn trống">Còn trống</option>
              <option value="Đã thuê">Đã thuê</option>
            </select>
          </div>

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

export default ApartmentForm
