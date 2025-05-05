# Hướng dẫn sử dụng ứng dụng Quản lý Hợp đồng Thuê Căn hộ

## Giới thiệu

Đây là ứng dụng quản lý hợp đồng thuê căn hộ với giao diện web đơn giản. Ứng dụng bao gồm:
- Backend: Node.js với Express và kết nối SQL Server
- Frontend: HTML, CSS, JavaScript với React

## Cài đặt

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- SQL Server (hoặc có thể chạy ở chế độ dữ liệu mẫu)

### Các bước cài đặt

1. **Tải xuống mã nguồn**
   - Tải xuống tất cả các file trong repository này

2. **Cài đặt các thư viện phụ thuộc**
   \`\`\`bash
   npm install express mssql cors
   \`\`\`

3. **Cấu hình kết nối cơ sở dữ liệu**
   - Mở file `server.js`
   - Chỉnh sửa thông tin kết nối SQL Server trong biến `dbConfig`:
     \`\`\`javascript
     const dbConfig = {
       user: 'sa',               // Tên đăng nhập
       password: '123456',       // Mật khẩu
       server: 'YOUR_SERVER',    // Tên server SQL
       database: 'chdv',         // Tên database
       options: {
         encrypt: false,
         trustServerCertificate: true,
         enableArithAbort: true,
         connectTimeout: 30000
       }
     };
     \`\`\`

## Chạy ứng dụng

1. **Khởi động server backend**
   \`\`\`bash
   node server.js
   \`\`\`
   Server sẽ chạy trên cổng 5500 hoặc 5501 nếu 5500 đã được sử dụng.

2. **Mở ứng dụng frontend**
   - Mở file `index.html` trong trình duyệt web

## Tính năng

- Xem danh sách hợp đồng thuê căn hộ
- Thêm hợp đồng mới
- Xóa hợp đồng

## Xử lý lỗi kết nối

Ứng dụng đã được cải tiến để xử lý các lỗi kết nối:

1. **Chế độ dữ liệu mẫu**: Nếu không thể kết nối đến SQL Server, ứng dụng sẽ tự động chuyển sang chế độ dữ liệu mẫu để bạn vẫn có thể sử dụng và kiểm tra giao diện.

2. **Kiểm tra nhiều cổng**: Frontend sẽ tự động kiểm tra kết nối với backend trên các cổng 5500 và 5501.

3. **Hiển thị trạng thái kết nối**: Giao diện hiển thị rõ ràng trạng thái kết nối với backend và cơ sở dữ liệu.

## Cấu trúc cơ sở dữ liệu

Ứng dụng sử dụng bảng `Sales` trong cơ sở dữ liệu với cấu trúc:

\`\`\`sql
CREATE TABLE Sales (
  sale_id INT PRIMARY KEY IDENTITY(1,1),
  employee_id INT NOT NULL,
  apartment_id INT NOT NULL,
  customer_name NVARCHAR(100) NOT NULL,
  sale_date DATE NOT NULL,
  duration INT NOT NULL,
  notes NVARCHAR(500) NULL,
  amount FLOAT NOT NULL
);
\`\`\`

## Khắc phục sự cố

1. **Không thể kết nối đến backend**
   - Kiểm tra xem server đã được khởi động chưa
   - Kiểm tra cổng 5500 và 5501 có đang được sử dụng bởi ứng dụng khác không
   - Kiểm tra tường lửa có chặn kết nối không

2. **Không thể kết nối đến SQL Server**
   - Kiểm tra thông tin kết nối trong file `server.js`
   - Đảm bảo SQL Server đang chạy
   - Kiểm tra quyền truy cập của tài khoản SQL

3. **Lỗi CORS**
   - Nếu gặp lỗi CORS, hãy đảm bảo rằng backend đã được cấu hình đúng để chấp nhận yêu cầu từ frontend

## Liên hệ hỗ trợ

Nếu bạn gặp vấn đề khi sử dụng ứng dụng, vui lòng liên hệ qua email: support@example.com
