import React, { useState } from 'react';
import { 
  Typography, 
  List, 
  Tag, 
  Button, 
  Tabs, 
  Space, 
  Badge, 
  Card,
  Empty
} from 'antd';
import { 
  BellOutlined, 
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock notification data
const notificationsData = [
  {
    id: 1,
    title: 'System Alert',
    description: 'Server performance has been optimized',
    time: '5 minutes ago',
    type: 'alert',
    read: false
  },
  {
    id: 2,
    title: 'New Truck Registration',
    description: 'A new truck has been registered: MH-04 AB 1234',
    time: '20 minutes ago',
    type: 'info',
    read: false
  },
  {
    id: 3,
    title: 'Document Compliance Warning',
    description: 'Transporter ABC Logistics has pending document compliance issues',
    time: '1 hour ago',
    type: 'warning',
    read: false
  },
  {
    id: 4,
    title: 'System Update Complete',
    description: 'System has been updated to version 2.3.0',
    time: '2 hours ago',
    type: 'success',
    read: true
  },
  {
    id: 5,
    title: 'Maintenance Scheduled',
    description: 'System maintenance scheduled for tomorrow at 2:00 AM',
    time: '3 hours ago',
    type: 'info',
    read: true
  },
  {
    id: 6,
    title: 'Truck Blacklist Alert',
    description: 'Truck DL-01 AB 4561 has been added to blacklist',
    time: '5 hours ago',
    type: 'alert',
    read: true
  },
  {
    id: 7,
    title: 'New User Added',
    description: 'User Rahul Sharma has been added to the system',
    time: '1 day ago',
    type: 'info',
    read: true
  },
  {
    id: 8,
    title: 'TAT Threshold Exceeded',
    description: 'Average TAT for Fleet #2234 has exceeded threshold',
    time: '2 days ago',
    type: 'warning',
    read: true
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState('all');
  
  // Get unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };
  
  // Mark single notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <Badge status="error" />;
      case 'warning':
        return <Badge status="warning" />;
      case 'success':
        return <Badge status="success" />;
      case 'info':
      default:
        return <Badge status="processing" />;
    }
  };
  
  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(notification => !notification.read);
      case 'alerts':
        return notifications.filter(notification => notification.type === 'alert' || notification.type === 'warning');
      case 'info':
        return notifications.filter(notification => notification.type === 'info' || notification.type === 'success');
      case 'all':
      default:
        return notifications;
    }
  };
  
  const filteredNotifications = getFilteredNotifications();
  
  // Tab items
  const tabItems = [
    {
      key: 'all',
      label: (
        <span>
          All
          <Badge count={notifications.length} size="small" style={{ marginLeft: 8 }} />
        </span>
      )
    },
    {
      key: 'unread',
      label: (
        <span>
          Unread
          <Badge count={unreadCount} size="small" style={{ marginLeft: 8 }} />
        </span>
      )
    },
    {
      key: 'alerts',
      label: 'Alerts & Warnings'
    },
    {
      key: 'info',
      label: 'Info & Updates'
    }
  ];
  
  return (
    <div className="notifications-container">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="page-header">
          <div className="page-title">
            <Title level={2}>
              <BellOutlined /> Notifications
            </Title>
            <Text type="secondary">
              View and manage your system notifications
            </Text>
          </div>
          
          {unreadCount > 0 && (
            <Button type="primary" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>
        
        <Card bordered={false}>
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={tabItems}
            className="notification-tabs"
          />
          
          {filteredNotifications.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={filteredNotifications}
              renderItem={item => (
                <List.Item
                  className={`notification-item ${!item.read ? 'unread' : ''}`}
                  actions={[
                    !item.read && (
                      <Button 
                        type="text" 
                        onClick={() => markAsRead(item.id)}
                        className="read-button"
                      >
                        Mark as read
                      </Button>
                    )
                  ]}
                >
                  <List.Item.Meta
                    avatar={getNotificationIcon(item.type)}
                    title={
                      <div className="notification-header">
                        <Text strong className="notification-title">{item.title}</Text>
                        <Tag color={
                          item.type === 'alert' ? 'error' : 
                          item.type === 'warning' ? 'warning' : 
                          item.type === 'success' ? 'success' : 
                          'processing'
                        }>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="notification-content">
                        <Text>{item.description}</Text>
                        <div className="notification-time">
                          <ClockCircleOutlined style={{ marginRight: 5 }} />
                          <Text type="secondary">{item.time}</Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty 
              description="No notifications found" 
              style={{ margin: '40px 0' }}
            />
          )}
        </Card>
      </Space>
    </div>
  );
};

export default Notifications; 