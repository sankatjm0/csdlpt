import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

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
};

// Kết nối đến SQL Server
sql.connect(config)
    .then(() => console.log('Kết nối đến SQL Server thành công'))
    .catch(err => console.error('Lỗi kết nối đến SQL Server:', err));

// API endpoints

// Lấy danh sách chi nhánh
app.get('/api/branches', async (req, res) => {
    try {
        const result = await sql.query`SELECT branch_id as id, name FROM Branch`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách chi nhánh:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Lấy danh sách nhân viên
app.get('/api/employees', async (req, res) => {
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
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách nhân viên:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Thêm nhân viên mới
app.post('/api/employees', async (req, res) => {
    try {
        const { name, position, birthday, phone, branch_id } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !phone || !birthday || !branch_id) {
            return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
        }

        const joinedtime = new Date().toISOString().split('T')[0];

        const result = await sql.query`
            INSERT INTO Employee (name, position, birthday, phone, branch_id, joinedtime, status)
                OUTPUT INSERTED.*
            VALUES (${name}, ${position}, ${birthday}, ${phone}, ${branch_id}, ${joinedtime}, 'Đang làm')
        `;

        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('Lỗi khi thêm nhân viên:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Cập nhật thông tin nhân viên
app.put('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, birthday, phone, branch_id, status } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !phone || !birthday || !branch_id) {
            return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
        }

        const result = await sql.query`
      UPDATE Employee
      SET name = ${name},
          position = ${position},
          birthday = ${birthday},
          phone = ${phone},
          branch_id = ${branch_id},
          status = ${status}
      OUTPUT INSERTED.*
      WHERE employee_id = ${id}
    `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Lỗi khi cập nhật nhân viên:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Xóa nhân viên
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await sql.query`
            DELETE FROM Employee
                OUTPUT DELETED.*
            WHERE employee_id = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
        }

        res.json({ message: 'Xóa nhân viên thành công' });
    } catch (err) {
        console.error('Lỗi khi xóa nhân viên:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Lấy danh sách chức vụ
app.get('/api/positions', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT DISTINCT position as name
            FROM Employee
            WHERE position IS NOT NULL
        `;

        // Chuyển đổi kết quả thành định dạng mong muốn
        const positions = result.recordset.map((pos, index) => ({
            id: index + 1,
            name: pos.name
        }));

        res.json(positions);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách chức vụ:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});