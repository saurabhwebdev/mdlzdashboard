import React from 'react';
import { Typography, Button, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import logo from '../logo.svg';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex', alignItems: 'center', padding: '40px 0' }}>
      <img src={logo} className="App-logo" alt="logo" style={{ height: 120 }} />
      <Title>Welcome to React + Ant Design</Title>
      <Paragraph style={{ fontSize: '16px', maxWidth: '600px', textAlign: 'center' }}>
        This is a starter template using React and Ant Design. It includes a responsive layout with header, 
        content, footer, and page routing with a 404 page.
      </Paragraph>
      <Space>
        <Button type="primary" href="https://ant.design" target="_blank" rel="noopener noreferrer" size="large">
          Learn Ant Design
        </Button>
        <Button 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          icon={<GithubOutlined />}
          size="large"
        >
          View Source
        </Button>
      </Space>
    </Space>
  );
};

export default HomePage; 