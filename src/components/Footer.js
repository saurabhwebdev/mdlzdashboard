import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <div className="footer-content">
        <span className="footer-text">TMS Dashboard © {new Date().getFullYear()}</span>
      </div>
    </Footer>
  );
};

export default AppFooter; 