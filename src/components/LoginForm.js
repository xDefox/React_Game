import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import { CircularProgress, Box } from '@mui/material';
import './LoginForm.css';

const LoginForm = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  // Очищаем ошибки при размонтировании
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Введите имя пользователя';
    if (!formData.password) newErrors.password = 'Введите пароль';
    
    if (Object.keys(newErrors).length > 0) {
      // Можно добавить отображение этих ошибок
      return;
    }

    // Используем async thunk из Redux
    dispatch(loginUser(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <h2>Вход в систему</h2>
          <button className="btn-close" onClick={onClose} disabled={isLoading}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message general-error">
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите имя пользователя"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              disabled={isLoading}
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <CircularProgress 
                    size={20} 
                    sx={{ color: 'white' }} 
                  />
                  <span>Вход...</span>
                </Box>
              ) : (
                '🔑 Войти'
              )}
            </button>
          </div>

          <div className="login-hint">
            <p><strong>Тестовые аккаунты:</strong></p>
            <p>👑 Админ: <code>admin</code> / <code>admin</code></p>
            <p>👤 Пользователь: <code>user</code> / <code>user</code></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;