import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  return (
    <div className="layout">
      <div className="top-header-line">
        <div className="top-line-left">
        </div>
      </div>

      <nav className="navbar">

        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
              </Link>
              <span className="user-welcome">
                 {user?.username}
              </span>
            </>
          ) : (
            <Link 
              to="/login" 
              className={location.pathname === '/login' ? 'active' : ''}
            >
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