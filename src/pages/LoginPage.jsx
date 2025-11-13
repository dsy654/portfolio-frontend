import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 导入 AuthContext

const API_URL = 'https://henry-portfolio-blog-api.onrender.com/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 从 Context 中获取 login 函数

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email: email,
        password: password,
      });
      
      // 调用 context 的 login 函数，传入用户信息和 token
      const { token, ...userData } = response.data;
      login(userData, token); 

      alert('登录成功！');
      navigate('/'); // 跳转到主页

    } catch (err) {
      console.error('登录失败:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : '登录失败，请检查您的凭据。');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>用户登录</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">邮箱地址:</label>
          <input
            type="email" id="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">密码:</label>
          <input
            type="password" id="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          登录
        </button>
      </form>
    </div>
  );
}

export default LoginPage;