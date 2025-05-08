import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branchId, setBranchId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dữ liệu mẫu cho người dùng
  const sampleUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  // Dữ liệu mẫu cho chi nhánh
  const sampleBranches = [
    { id: '1', name: 'Chi nhánh Hà Nội' },
    { id: '2', name: 'Chi nhánh TP. Hồ Chí Minh' },
    { id: '3', name: 'Chi nhánh Đà Nẵng' },
    { id: '4', name: 'Chi nhánh Hải Phòng' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === sampleUser.email && password === sampleUser.password && branchId) {
      setError('');
      navigate('/management', { state: { branchId } });
    } else {
      setError('Email, mật khẩu hoặc chi nhánh không hợp lệ');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Đăng Nhập</h1>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <select
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          className="select"
          required
        >
          <option value="" disabled>
            Chọn chi nhánh
          </option>
          {sampleBranches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <button type="submit" className="button">
          Đăng Nhập
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="sample-text">
        Dữ liệu mẫu: Email: {sampleUser.email} | Mật khẩu: {sampleUser.password}
      </p>
    </div>
  );
}

export default LoginPage;