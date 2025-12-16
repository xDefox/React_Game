// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import AppRouter from './router/AppRouter';
import { ThemeProvider } from './theme/themeContext/ThemeContext'; // Контекст темы
import { MuiThemeProvider } from './theme/MuiThemeProvider'; // MUI тема
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider> 
        <MuiThemeProvider>
          <Router>
            <AppRouter />
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;