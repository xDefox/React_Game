import React, { useState } from 'react';
import { 
  CircularProgress, 
  Box, 
  Backdrop,
  Fade,
  Button
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import './LoginForm.css';

const LoginForm = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      
      if (formData.username === 'admin' && formData.password === 'admin') {
        onLogin({ username: formData.username, role: 'admin' });
      } else if (formData.username === 'user' && formData.password === 'user') {
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
    <Backdrop
      open={true}
      sx={{ 
        zIndex: 2000,
        backdropFilter: 'blur(5px)'
      }}
    >
      <Fade in={true}>
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
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? null : <LoginIcon />}
                sx={{
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  minHeight: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    opacity: 0.8
                  }
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress 
                      size={20} 
                      sx={{ 
                        color: 'white',
                      }} 
                    />
                    Вход...
                  </Box>
                ) : (
                  'Войти'
                )}
              </Button>
            </div>

            <div className="login-hint">
              <p><strong>Тестовые аккаунты:</strong></p>
              <p> Админ: <code>admin</code> / <code>admin</code></p>
              <p> Пользователь: <code>user</code> / <code>user</code></p>
            </div>
          </form>
        </div>
      </Fade>
    </Backdrop>
  );
};

export default LoginForm;