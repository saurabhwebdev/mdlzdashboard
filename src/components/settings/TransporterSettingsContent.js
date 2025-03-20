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

const TransporterSettingsContent = ({ transportersData, transporterColumns }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div className="section-header">
        <Title level={4}>Transporter Management</Title>
        <Paragraph>Manage transporters and their details.</Paragraph>
      </div>
      
      <div className="section-actions">
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
        >
          Add New Transporter
        </Button>
      </div>
      
      <div className="section-content">
        <Table 
          columns={transporterColumns} 
          dataSource={transportersData} 
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </div>
      
      <Divider />
      
      <div className="section-header">
        <Title level={4}>Transporter Documentation</Title>
        <Paragraph>Configure required documentation for transporters.</Paragraph>
      </div>
      
      <div className="section-content">
        <div className="placeholder-content">
          <Text type="secondary">Transporter documentation configuration interface will be implemented here.</Text>
        </div>
      </div>
    </Space>
  );
};

export default TransporterSettingsContent; 