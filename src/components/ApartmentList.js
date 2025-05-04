"use client"
import "./ApartmentList.css"

function normalizeStatus(status) {
  return status.normalize("NFC").replace(/^Ð/, "Đ").trim()
}

function ApartmentList({ apartments, onEdit, onDelete }) {
  return (
    <div className="apartment-list">
      <table>
        <thead>
          <tr>
            <th>Mã Căn Hộ</th>
            <th>Tên Căn Hộ</th>
            <th>Địa Chỉ</th>
            <th>Giá</th>
            <th>Chi Nhánh</th>
            <th>Ngày Cập Nhật</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {apartments.length > 0 ? (
            apartments.map((apartment) => (
              <tr key={apartment.apartment_id}>
                <td>{apartment.apartment_id}</td>
                <td>{apartment.name}</td>
                <td>{apartment.address}</td>
                <td>{formatCurrency(apartment.price)}</td>
                <td>{apartment.branch_name || apartment.branch_id}</td>
                <td>{formatDate(apartment.updatedtime)}</td>
                <td>
                  <span
                    className={`status-badge ${normalizeStatus(apartment.status) === "Còn trống" ? "active" : "inactive"}`}
                  >
                    {apartment.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="edit-button" onClick={() => onEdit(apartment)}>
                    Sửa
                  </button>
                  <button className="delete-button" onClick={() => onDelete(apartment.apartment_id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
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

function formatCurrency(amount) {
  if (!amount) return ""
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
}

export default ApartmentList
