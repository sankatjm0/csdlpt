import express from "express"
import cors from "cors"
import sql from "mssql"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 5001

// Middleware
app.use(cors())
app.use(express.json())

// Cấu hình kết nối SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Nếu sử dụng Azure
    trustServerCertificate: true, // Thay đổi tùy theo môi trường
  },
}

// Kết nối đến SQL Server
sql
  .connect(config)
  .then(() => console.log("Kết nối đến SQL Server thành công"))
  .catch((err) => console.error("Lỗi kết nối đến SQL Server:", err))

// API endpoints

// Lấy danh sách chi nhánh
app.get("/api/branches", async (req, res) => {
  try {
    const result = await sql.query`SELECT branch_id as id, name FROM Branch`
    res.json(result.recordset)
  } catch (err) {
    console.error("Lỗi khi lấy danh sách chi nhánh:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Lấy danh sách căn hộ
app.get("/api/apartments", async (req, res) => {
  try {
    const result = await sql.query`
            SELECT
                a.apartment_id,
                a.photos,
                a.name,
                a.address,
                a.status,
                a.price,
                a.branch_id,
                a.updatedtime,
                b.name as branch_name
            FROM Apartment a
                     LEFT JOIN Branch b ON a.branch_id = b.branch_id
        `
    res.json(result.recordset)
  } catch (err) {
    console.error("Lỗi khi lấy danh sách căn hộ:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Thêm căn hộ mới
app.post("/api/apartments", async (req, res) => {
  try {
    const { name, address, status, price, branch_id, photos } = req.body

    // Kiểm tra dữ liệu đầu vào
    if (!name || !address || !price || !branch_id) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" })
    }

    const updatedtime = new Date().toISOString()

    const result = await sql.query`
            INSERT INTO Apartment (name, address, status, price, branch_id, photos, updatedtime)
                OUTPUT INSERTED.*
            VALUES (${name}, ${address}, ${status}, ${price}, ${branch_id}, ${photos}, ${updatedtime})
        `

    res.status(201).json(result.recordset[0])
  } catch (err) {
    console.error("Lỗi khi thêm căn hộ:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Cập nhật thông tin căn hộ
app.put("/api/apartments/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { name, address, status, price, branch_id, photos } = req.body

    // Kiểm tra dữ liệu đầu vào
    if (!name || !address || !price || !branch_id) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" })
    }

    const updatedtime = new Date().toISOString()

    const result = await sql.query`
      UPDATE Apartment
      SET name = ${name},
          address = ${address},
          status = ${status},
          price = ${price},
          branch_id = ${branch_id},
          photos = ${photos},
          updatedtime = ${updatedtime}
      OUTPUT INSERTED.*
      WHERE apartment_id = ${id}
    `

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy căn hộ" })
    }

    res.json(result.recordset[0])
  } catch (err) {
    console.error("Lỗi khi cập nhật căn hộ:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Xóa căn hộ
app.delete("/api/apartments/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await sql.query`
            DELETE FROM Apartment
                OUTPUT DELETED.*
            WHERE apartment_id = ${id}
        `

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy căn hộ" })
    }

    res.json({ message: "Xóa căn hộ thành công" })
  } catch (err) {
    console.error("Lỗi khi xóa căn hộ:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Lấy danh sách trạng thái
app.get("/api/statuses", async (req, res) => {
  try {
    const result = await sql.query`
            SELECT DISTINCT status as name
            FROM Apartment
            WHERE status IS NOT NULL
        `

    // Chuyển đổi kết quả thành định dạng mong muốn
    const statuses = result.recordset.map((status, index) => ({
      id: index + 1,
      name: status.name,
    }))

    res.json(statuses)
  } catch (err) {
    console.error("Lỗi khi lấy danh sách trạng thái:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Giữ lại các API endpoints cho nhân viên để tương thích ngược
app.get("/api/employees", async (req, res) => {
  try {
    const result = await sql.query`
            SELECT
                e.employee_id,
                e.name,
                e.position,
                e.birthday,
                e.phone,
                e.branch_id,
                e.joinedtime,
                e.status,
                b.name as branch_name
            FROM Employee e
                     LEFT JOIN Branch b ON e.branch_id = b.branch_id
        `
    res.json(result.recordset)
  } catch (err) {
    console.error("Lỗi khi lấy danh sách nhân viên:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

// Lấy danh sách chức vụ
app.get("/api/positions", async (req, res) => {
  try {
    const result = await sql.query`
            SELECT DISTINCT position as name
            FROM Employee
            WHERE position IS NOT NULL
        `

    // Chuyển đổi kết quả thành định dạng mong muốn
    const positions = result.recordset.map((pos, index) => ({
      id: index + 1,
      name: pos.name,
    }))

    res.json(positions)
  } catch (err) {
    console.error("Lỗi khi lấy danh sách chức vụ:", err)
    res.status(500).json({ error: "Lỗi server" })
  }
})

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`)
})
