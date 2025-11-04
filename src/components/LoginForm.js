import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';  // ← исправлен путь (одна точка!)
import { CircularProgress, Box } from '@mui/material';
import './LoginForm.css';

const LoginForm = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Валидация
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Введите имя пользователя';
    if (!formData.password) newErrors.password = 'Введите пароль';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Используем Redux для логина
      if (formData.username === 'admin' && formData.password === 'admin') {
        dispatch(login({ username: formData.username, role: 'admin' }));
        onLogin({ username: formData.username, role: 'admin' });
      } else if (formData.username === 'user' && formData.password === 'user') {
        dispatch(login({ username: formData.username, role: 'user' }));
        onLogin({ username: formData.username, role: 'user' });
      } else {
        setErrors({ general: 'Неверное имя пользователя или пароль' });
      }
    } catch (error) {
      setErrors({ general: 'Ошибка при авторизации' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
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
          {errors.general && (
            <div className="error-message general-error">
               {errors.general}
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
              className={errors.username ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
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
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
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
            <p>Пользователь: <code>user</code> / <code>user</code></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;