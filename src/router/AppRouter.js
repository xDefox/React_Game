import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/loginPage';               
import DashboardPage from '../pages/dashboardPage';        
import NotFoundPage from '../pages/notFoundPage';         


const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;