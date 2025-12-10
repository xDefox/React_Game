import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearError } from '../../store/slices/AuthSlice';
import { CircularProgress, Box } from '@mui/material';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  //валидахтунг
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Введите имя пользователя')
      .min(3, 'Минимум 3 символа'),
    password: Yup.string()
      .required('Введите пароль')
      .min(4, 'Минимум 4 символа')
  });

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <div className="login-header">
          <h2>Вход в систему</h2>
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(loginUser(values));
          }}
        >
          {({ errors, touched }) => (
            <Form className="login-form">
              {error && (
                <div className="error-message general-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="username">Имя пользователя</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Введите имя пользователя"
                  disabled={isLoading}
                />
                {errors.username && touched.username && (
                  <div className="error-message">
                    {errors.username}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Введите пароль"
                  disabled={isLoading}
                />
                {errors.password && touched.password && (
                  <div className="error-message">
                    {errors.password}
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
                    'Войти'
                  )}
                </button>
              </div>

              <div className="login-hint">
                <p><strong>Тестовые аккаунты:</strong></p>
                <p>Админ: <code>admin</code> / <code>admin</code></p>
                <p>Пользователь: <code>user</code> / <code>user</code></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;