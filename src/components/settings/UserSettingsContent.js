import React from 'react';
import { 
  Typography, 
  Table, 
  Button, 
  Space, 
  Divider
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const UserSettingsContent = ({ users, userColumns }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div className="section-header">
        <Title level={4}>User Management</Title>
        <Paragraph>Manage users and their access rights in the system.</Paragraph>
      </div>
      
      <div className="section-actions">
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
        >
          Add New User
        </Button>
      </div>
      
      <div className="section-content">
        <Table 
          columns={userColumns} 
          dataSource={users} 
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </div>
      
      <Divider />
      
      <div className="section-header">
        <Title level={4}>Role Management</Title>
        <Paragraph>Define roles and permissions for system users.</Paragraph>
      </div>
      
      <div className="section-content">
        <div className="placeholder-content">
          <Text type="secondary">Role configuration interface will be implemented here.</Text>
        </div>
      </div>
    </Space>
  );
};

export default UserSettingsContent; 