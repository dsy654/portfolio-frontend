import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 如果还在从 localStorage 加载用户信息，先显示加载状态
  if (loading) {
    return <div>正在加载认证信息...</div>;
  }

  // 如果加载完毕但没有用户信息，重定向到登录页
  if (!user) {
    // a. 传入 location.pathname, 这样登录后可以重定向回原来的页面
    // b. replace={true} 表示替换历史记录，用户不能通过“后退”按钮回到之前的受限页面
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用户信息存在，就正常显示该页面
  return children;
}

export default ProtectedRoute;