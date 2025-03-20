import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';

// Components
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import NotFound from './components/NotFound';

// Pages
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import SystemStatus from './pages/SystemStatus';
import Notifications from './pages/Notifications';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <AppHeader />
        <Content className="site-content">
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Router>
  );
}

export default App; 