import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="content">
            <h1>Chào mừng đến với Quản Lý Cho Thuê Căn Hộ</h1>
            <p>Vui lòng vào <Link to="/management">trang quản lý</Link> để bắt đầu.</p>
        </div>
    );
}

export default HomePage;