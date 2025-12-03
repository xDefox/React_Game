import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../store/slices/authSlice';
import { CircularProgress, Box } from '@mui/material';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [localErrors, setLocalErrors] = useState({}); // ← ДОБАВИЛИ локальное состояние для ошибок валидации

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);

  // Редирект после успешного логина
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Очищаем ошибки при размонтировании
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = {};
    
    if (!formData.username.trim()) {
      formErrors.username = 'Введите имя пользователя';
    } else if (formData.username.length < 3) {
      formErrors.username = 'Минимум 3 символа';
    }
    
    if (!formData.password) {
      formErrors.password = 'Введите пароль';
    } else if (formData.password.length < 4) {
      formErrors.password = 'Минимум 4 символа';
    }
    
    if (Object.keys(formErrors).length > 0) {
      setLocalErrors(formErrors); // ← Исправлено: было setErrors, стало setLocalErrors
      return;
    }
    
    // Если валидация прошла, очищаем локальные ошибки и вызываем действие Redux
    setLocalErrors({});
    dispatch(loginUser(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку для конкретного поля при изменении
    if (localErrors[name]) {
      setLocalErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <div className="login-header">
          <h2>Вход в систему</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message general-error">
              {error}
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
            {localErrors.username && (
              <div className="error-message field-error">
                {localErrors.username}
              </div>
            )}
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
            {localErrors.password && (
              <div className="error-message field-error">
                {localErrors.password}
              </div>
            )}
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
                ' Войти'
              )}
            </button>
          </div>

          <div className="login-hint">
            <p><strong>Тестовые аккаунты:</strong></p>
            <p> Админ: <code>admin</code> / <code>admin</code></p>
            <p> Пользователь: <code>user</code> / <code>user</code></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;