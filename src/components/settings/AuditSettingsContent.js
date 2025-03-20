import React from 'react';
import { 
  Typography, 
  Card, 
  Form, 
  Input, 
  Button, 
  Space, 
  Divider,
  Row,
  Col,
  Radio,
  Table,
  Tooltip
} from 'antd';
import { EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AuditSettingsContent = () => {
  // Sample data for audit trail
  const auditTrail = [
    { 
      id: 1, 
      action: 'User Login', 
      user: 'Saurabh Thakur', 
      timestamp: '2023-08-12 08:30:15', 
      details: 'Successful login from 192.168.1.100' 
    },
    { 
      id: 2, 
      action: 'Truck Classification Changed', 
      user: 'Jane Doe', 
      timestamp: '2023-08-12 09:45:22', 
      details: 'Changed Refrigerated Truck from Green to Orange Channel' 
    },
    { 
      id: 3, 
      action: 'Transporter Blacklisted', 
      user: 'John Smith', 
      timestamp: '2023-08-11 14:20:05', 
      details: 'Added XYZ Transport to blacklist due to documentation issues' 
    },
    { 
      id: 4, 
      action: 'System Settings Updated', 
      user: 'Saurabh Thakur', 
      timestamp: '2023-08-10 11:15:30', 
      details: 'Updated notification settings for email alerts' 
    },
  ];
  
  // Audit trail columns
  const auditColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button type="text" size="small" icon={<EyeOutlined />} className="action-icon-button" />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div className="section-header">
        <Title level={4}>System Audit Trail</Title>
        <Paragraph>View historical record of actions and changes in the system.</Paragraph>
      </div>
      
      <div className="section-content">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bordered={false} className="approval-list-card">
              <Table 
                columns={auditColumns} 
                dataSource={auditTrail} 
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      
      <Divider />
      
      <div className="section-header">
        <Title level={4}>Audit Settings</Title>
        <Paragraph>Configure audit trail retention and privacy settings.</Paragraph>
      </div>
      
      <div className="section-content">
        <Form layout="vertical">
          <Form.Item 
            label="Audit Trail Retention (days)" 
            tooltip={{ 
              title: 'Number of days to retain audit trail records', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Input type="number" defaultValue="90" style={{ width: 200 }} />
          </Form.Item>
          
          <Form.Item 
            label="Audit Export Format" 
            tooltip={{ 
              title: 'Default format for audit trail exports', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Radio.Group defaultValue="csv">
              <Radio value="csv">CSV</Radio>
              <Radio value="excel">Excel</Radio>
              <Radio value="pdf">PDF</Radio>
            </Radio.Group>
          </Form.Item>
          
          <Button 
            type="primary" 
            style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
          >
            Save Settings
          </Button>
        </Form>
      </div>
    </Space>
  );
};

export default AuditSettingsContent; 