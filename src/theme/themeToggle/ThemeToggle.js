import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import { ThemeContext } from '../MuiThemeProvider';

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <Tooltip title={isDarkMode ? 'Светлая тема' : 'Тёмная тема'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          ml: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {isDarkMode ? (
          <Brightness7Icon sx={{ color: '#ff9800' }} />
        ) : (
          <Brightness4Icon sx={{ color: '#1976d2' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;