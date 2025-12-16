// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
        light: mode === 'light' ? '#4791db' : '#bbdefb',
        dark: mode === 'light' ? '#115293' : '#42a5f5',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
        light: mode === 'light' ? '#e33371' : '#f8bbd0',
        dark: mode === 'light' ? '#9a0036' : '#ad1457',
      },
      success: {
        main: mode === 'light' ? '#4caf50' : '#66bb6a',
      },
      error: {
        main: mode === 'light' ? '#f44336' : '#ef5350',
      },
      warning: {
        main: mode === 'light' ? '#ff9800' : '#ffa726',
      },
      info: {
        main: mode === 'light' ? '#2196f3' : '#29b6f6',
      },
      background: {
        default: mode === 'light' ? '#f5f7fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: mode === 'light' 
      ? [
          'none',
          '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
          '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
          '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
          '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
        ]
      : [
          'none',
          '0px 2px 1px -1px rgba(0,0,0,0.5),0px 1px 1px 0px rgba(0,0,0,0.42),0px 1px 3px 0px rgba(0,0,0,0.36)',
          '0px 3px 1px -2px rgba(0,0,0,0.5),0px 2px 2px 0px rgba(0,0,0,0.42),0px 1px 5px 0px rgba(0,0,0,0.36)',
          '0px 3px 3px -2px rgba(0,0,0,0.5),0px 3px 4px 0px rgba(0,0,0,0.42),0px 1px 8px 0px rgba(0,0,0,0.36)',
          '0px 2px 4px -1px rgba(0,0,0,0.5),0px 4px 5px 0px rgba(0,0,0,0.42),0px 1px 10px 0px rgba(0,0,0,0.36)',
          '0px 3px 5px -1px rgba(0,0,0,0.5),0px 5px 8px 0px rgba(0,0,0,0.42),0px 1px 14px 0px rgba(0,0,0,0.36)',
        ],
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    },
  });
};