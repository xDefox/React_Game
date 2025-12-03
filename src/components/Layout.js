import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  return (
    <div className="layout">
      {/* ВЕРХНЯЯ СТРОКА - ТОЛЬКО ПРИВЕТСТВИЕ */}
      <div className="top-header-line">
        {isAuthenticated && (
          <div className="user-greeting-line">
            <span className="my-cards-badge">Мои карточки</span>
            <span className="greeting-text">Привет, {user?.username}!</span>
          </div>
        )}
      </div>

      {/* ПРОСТОЙ НАВБАР БЕЗ "Менеджер карточек" */}
      <nav className="navbar">
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                📋 Мои карточки
              </Link>
              <span className="user-welcome">
                👤 {user?.username}
              </span>
            </>
          ) : (
            <Link 
              to="/login" 
              className={location.pathname === '/login' ? 'active' : ''}
            >
              🔑 Войти
            </Link>
          )}
        </div>
      </nav>
      
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;