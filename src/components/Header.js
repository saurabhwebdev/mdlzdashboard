import React, { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Tooltip, Typography, Space, Dropdown, Avatar, Button } from 'antd';
import { 
  SettingOutlined, 
  UserOutlined, 
  BellOutlined,
  MenuOutlined,
  DashboardOutlined,
  BarChartOutlined,
  TeamOutlined,
  FileTextOutlined,
  CarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.svg';

const { Header } = Layout;
const { Text } = Typography;

// System status indicator component
const SystemStatusIndicator = () => {
  const [status, setStatus] = useState("success"); // success, warning, error
  
  useEffect(() => {
    // Randomly change status between success, warning and error for demo purposes
    const interval = setInterval(() => {
      const statuses = ["success", "warning", "error"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(randomStatus);
    }, 10000); // change every 10 seconds for demo
    
    return () => clearInterval(interval);
  }, []);
  
  // Get status info based on current status
  const getStatusInfo = (status) => {
    switch(status) {
      case 'success':
        return { color: '#52c41a', message: 'All Systems Operational' };
      case 'warning':
        return { color: '#faad14', message: 'System Performance Degraded' };
      case 'error':
        return { color: '#f5222d', message: 'System Outage Detected' };
      default:
        return { color: '#52c41a', message: 'All Systems Operational' };
    }
  };
  
  const { color, message } = getStatusInfo(status);
  
  return (
    <Tooltip title={message} color="#000" overlayClassName="status-tooltip">
      <Badge status={status} className="status-dot" />
    </Tooltip>
  );
};

const AppHeader = () => {
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  
  // Handle window resize and update mobile state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile && mobileMenuVisible) {
        setMobileMenuVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuVisible]);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuVisible(false);
  }, [location.pathname]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.querySelector('.mobile-menu');
      const menuButton = document.querySelector('.mobile-menu-button');
      
      if (mobileMenuVisible && 
          menu && 
          !menu.contains(event.target) && 
          menuButton && 
          !menuButton.contains(event.target)) {
        setMobileMenuVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuVisible]);

  // User menu items
  const userMenuItems = {
    items: [
      {
        key: '1',
        label: (
          <div className="user-info">
            <div className="user-name">
              <Text strong>Saurabh Thakur</Text>
            </div>
            <div className="user-role">
              <Text type="secondary">Administrator</Text>
            </div>
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: (
          <Link to="/profile">
            <UserOutlined /> Profile
          </Link>
        ),
      },
      {
        key: '3',
        label: (
          <Link to="/settings">
            <SettingOutlined /> Settings
          </Link>
        ),
      },
      {
        key: '4',
        danger: true,
        label: (
          <div className="logout-item">
            <LogoutOutlined /> Logout
          </div>
        ),
      },
    ],
  };

  // Notification items
  const notificationItems = {
    items: [
      {
        key: '1',
        label: (
          <div className="notification-item">
            <div className="notification-title">
              <Text strong>System Alert</Text>
            </div>
            <div className="notification-description">
              <Text type="secondary">Server performance optimized</Text>
            </div>
            <div className="notification-time">
              <Text type="secondary">5 min ago</Text>
            </div>
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div className="notification-item">
            <div className="notification-title">
              <Text strong>System Update</Text>
            </div>
            <div className="notification-description">
              <Text type="secondary">New dashboard data available</Text>
            </div>
            <div className="notification-time">
              <Text type="secondary">20 min ago</Text>
            </div>
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: (
          <Link to="/notifications" className="view-all">
            <Text>View all notifications</Text>
          </Link>
        ),
      },
    ],
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  // Navigation items
  const navItems = [
    {
      key: '/',
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/system-status',
      label: <Link to="/system-status">System Status</Link>,
    },
    {
      key: '/settings',
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  return (
    <Header className="app-header">
      <div className="header-container">
        {/* Logo and brand name */}
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <img src={logo} alt="TMS Logo" className="logo-image" />
            <span className="logo-text">TMS Dashboard</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="desktop-nav">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={navItems}
              className="desktop-menu"
              theme="dark"
            />
          </div>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleMobileMenu}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          />
        )}

        {/* Right side actions */}
        <div className="header-actions">
          <Space size={16}>
            <Dropdown
              menu={notificationItems}
              placement="bottomRight"
              trigger={['click']}
              overlayClassName="header-dropdown"
            >
              <Badge count={5} size="small" className="notification-badge">
                <BellOutlined className="header-icon" />
              </Badge>
            </Dropdown>
            
            <Dropdown 
              menu={userMenuItems}
              placement="bottomRight"
              trigger={['click']}
              overlayClassName="header-dropdown"
            >
              <div className="user-avatar-container">
                <Avatar 
                  icon={<UserOutlined />} 
                  className="user-avatar"
                  size={32}
                />
              </div>
            </Dropdown>
          </Space>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <div className={`mobile-menu ${mobileMenuVisible ? 'visible' : ''}`}>
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={navItems}
            className="mobile-menu-items"
            onClick={() => setMobileMenuVisible(false)}
            theme="dark"
          />
        </div>
      )}
    </Header>
  );
};

export default AppHeader; 