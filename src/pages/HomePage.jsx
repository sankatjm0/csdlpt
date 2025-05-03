import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const sampleUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Kiểm tra thông tin đăng nhập với dữ liệu mẫu
    if (email === sampleUser.email && password === sampleUser.password) {
      setError('');
      // Chuyển hướng đến trang /management khi đăng nhập thành công
      navigate('/management');
    } else {
      setError('Email hoặc mật khẩu không đúng');
    }
  };

  // CSS inline với tông màu cam-đen-trắng
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      color: '#f28c38',
      fontSize: '2.5rem',
      marginBottom: '30px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #1a1a1a',
      fontSize: '1rem',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
    },
    button: {
      padding: '12px',
      marginTop: '20px',
      backgroundColor: '#f28c38',
      color: '#1a1a1a',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
    },
    error: {
      color: '#f28c38',
      fontSize: '1rem',
      marginTop: '10px',
    },
    sampleText: {
      marginTop: '20px',
      fontSize: '0.9rem',
      color: '#1a1a1a',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Đăng Nhập</h1>
      <form style={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.button)}
        >
          Đăng Nhập
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <p style={styles.sampleText}>
        Dữ liệu mẫu: Email: {sampleUser.email} | Mật khẩu: {sampleUser.password}
      </p>
    </div>
  );
}

export default LoginPage;