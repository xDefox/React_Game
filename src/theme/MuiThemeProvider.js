import React, { useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { useTheme } from './themeContext/ThemeContext';
import { getTheme } from './theme';

export const MuiThemeProvider = ({ children }) => {
  const { mode } = useTheme();

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};