import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearError } from '../../store/slices/AuthSlice';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


// Стилизованный компонент для Field
const StyledTextField = ({ field, form, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={form.touched[field.name] && !!form.errors[field.name]}
    helperText={form.touched[field.name] && form.errors[field.name]}
    fullWidth
    variant="outlined"
  />
);

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

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

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Введите имя пользователя')
      .min(3, 'Минимум 3 символа'),
    password: Yup.string()
      .required('Введите пароль')
      .min(4, 'Минимум 4 символа')
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        p: 4,
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          color: 'primary.main'
        }}
      >
        Вход в систему
      </Typography>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(loginUser(values));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Field
                name="username"
                component={StyledTextField}
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                disabled={isLoading}
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Field
                name="password"
                component={StyledTextField}
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                disabled={isLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: 'white' }} />
                  <span>Вход...</span>
                </Box>
              ) : (
                'Войти'
              )}
            </Button>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Тестовые аккаунты:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Админ: <code>admin</code> / <code>admin</code>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Пользователь: <code>user</code> / <code>user</code>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;