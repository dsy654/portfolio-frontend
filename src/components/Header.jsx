import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '1rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ margin: 0 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>my personal portfolio</Link>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0 }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>home page</Link></li>
            <li><Link to="/projects" style={{ color: 'white', textDecoration: 'none' }}>project</Link></li>
            <li><Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>blog</Link></li>
            <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>contact me</Link></li>
          </ul>
          
          <div style={{ marginLeft: '3rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <>
                <span>欢迎, {user.username}</span>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>后台管理</Link>
                <button onClick={handleLogout} style={{ background: '#555', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                  退出
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none', background: '#555', padding: '8px 15px', borderRadius: '5px' }}>登录</Link>
                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>注册</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;