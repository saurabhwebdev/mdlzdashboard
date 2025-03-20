import React from 'react';
import { 
  Typography, 
  Table, 
  Button, 
  Form, 
  Switch, 
  Space, 
  Divider
} from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AlertSettingsContent = ({ alertSettings, alertColumns }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div className="section-header">
        <Title level={4}>Alert Configuration</Title>
        <Paragraph>Configure system alerts and notifications.</Paragraph>
      </div>
      
      <div className="section-actions">
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
        >
          Add New Alert
        </Button>
      </div>
      
      <div className="section-content">
        <Table 
          columns={alertColumns} 
          dataSource={alertSettings} 
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </div>
      
      <Divider />
      
      <div className="section-header">
        <Title level={4}>Notification Channels</Title>
        <Paragraph>Configure how alerts are delivered to users.</Paragraph>
      </div>
      
      <div className="section-content">
        <Form layout="vertical">
          <Form.Item 
            label="Email Notifications" 
            tooltip={{ 
              title: 'Send alert notifications via email', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Switch defaultChecked />
          </Form.Item>
          
          <Form.Item 
            label="SMS Notifications" 
            tooltip={{ 
              title: 'Send alert notifications via SMS', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Switch defaultChecked />
          </Form.Item>
          
          <Form.Item 
            label="In-App Notifications" 
            tooltip={{ 
              title: 'Display alert notifications within the application', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Switch defaultChecked />
          </Form.Item>
          
          <Button 
            type="primary" 
            style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
          >
            Save Changes
          </Button>
        </Form>
      </div>
    </Space>
  );
};

export default AlertSettingsContent; 