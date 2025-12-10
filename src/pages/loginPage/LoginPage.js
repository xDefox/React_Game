import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/loginform/LoginForm.js';
import './LoginPage.css';

const LoginPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

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