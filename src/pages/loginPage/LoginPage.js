import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/loginform/LoginForm.js';
import {
  Box,
  Container,
  Paper,
  Typography,
  CssBaseline,
} from '@mui/material';

const LoginPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: (theme) => 
            theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
              : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {/* Левая часть - приветствие */}
            <Box sx={{ flex: 1, maxWidth: 500 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  mb: 3,
                  fontWeight: 700,
                  background: (theme) => 
                    theme.palette.mode === 'light'
                      ? 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)'
                      : 'linear-gradient(45deg, #90caf9 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Менеджер карточек
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2,
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Организуйте свои задачи эффективно
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.6,
                }}
              >
                Создавайте, редактируйте и управляйте карточками задач в удобном интерфейсе.
                Работайте индивидуально или в команде с системой ролей.
              </Typography>
            </Box>

            {/* Правая часть - форма входа */}
            <Paper
              elevation={6}
              sx={{
                flex: 1,
                maxWidth: 500,
                p: 4,
                borderRadius: 3,
                bgcolor: 'background.paper',
              }}
            >
              <LoginForm />
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;