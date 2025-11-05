import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  // Если уже авторизован - редирект на главную
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;