// Layout.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/AuthSlice';
//import { useAppTheme } from '../../hooks/UseAppTheme';
import {useTheme} from '../../theme/themeContext/ThemeContext'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { mode, toggleTheme } = useTheme();

  console.log('Layout - mode:', mode, 'toggleTheme:', toggleTheme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isAuthenticated && (
        <AppBar 
          position="static" 
          elevation={2}
          sx={{ 
            mb: 3,
            borderRadius: '0 0 12px 12px',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Менеджер карточек
              </Typography>
              <Typography variant="caption" sx={{ 
                bgcolor: 'primary.dark',
                color: '#ffffff',
                px: 1.5,
                py: 0.5,
                borderRadius: '20px',
                display: 'inline-block',
              }}>
                {user?.username} ({user?.role === 'admin' ? 'Админ' : 'Пользователь'})
              </Typography>
            </Box>
            
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{ 
                  border: 2,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'background.paper',
                  }
                }}
              >
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              
              <Button
                variant="contained"
                onClick={handleLogout}
                startIcon={<ExitToAppIcon />}
                sx={{
                  bgcolor: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.dark',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Выйти
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      
      <Container 
        component="main" 
        maxWidth="xl"
        sx={{ 
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;