import React from 'react';
import { 
  Typography, 
  Card, 
  Table, 
  Form, 
  Input, 
  Button, 
  Space, 
  Divider,
  Tag,
  Tooltip,
  Row,
  Col,
  Alert
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  InfoCircleOutlined,
  SwapOutlined, 
  StopOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const TruckSettingsContent = ({ 
  truckTypesData,
  truckColumns,
  classificationCriteria,
  handleCriteriaChange,
  showClassificationModal,
  showBlacklistModal,
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div className="section-header">
        <Title level={4}>Truck Type Management</Title>
        <Paragraph>Manage truck types and their specifications.</Paragraph>
      </div>
      
      <div className="section-actions">
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
        >
          Add New Truck Type
        </Button>
      </div>
      
      <div className="section-content">
        <Table 
          columns={truckColumns} 
          dataSource={truckTypesData} 
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </div>
      
      <Divider />
      
      <div className="section-header">
        <Title level={4}>Truck Classification</Title>
        <Paragraph>Configure truck classification parameters and rules.</Paragraph>
      </div>
      
      <div className="section-content">
        <Card bordered={false} className="truck-classification-card">
          <Form layout="vertical">
            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Form.Item 
                  className="classification-criteria-item"
                  label={
                    <Space>
                      <span>Document Compliance Threshold (%)</span>
                      <Tooltip title="Trucks from transporters with document compliance above this threshold can be classified as Green Channel">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Input
                    type="number"
                    value={classificationCriteria.documentComplianceThreshold}
                    onChange={(e) => handleCriteriaChange('documentComplianceThreshold', parseFloat(e.target.value))}
                    addonAfter="%"
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item 
                  className="classification-criteria-item"
                  label={
                    <Space>
                      <span>Previous Visits Threshold</span>
                      <Tooltip title="Minimum number of previous successful visits required for Green Channel classification">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Input
                    type="number"
                    value={classificationCriteria.previousVisitThreshold}
                    onChange={(e) => handleCriteriaChange('previousVisitThreshold', parseInt(e.target.value))}
                    min={0}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item 
                  className="classification-criteria-item"
                  label={
                    <Space>
                      <span>Transporter Rating Threshold</span>
                      <Tooltip title="Minimum transporter rating (out of 5) required for Green Channel classification">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Input
                    type="number"
                    value={classificationCriteria.transporterRatingThreshold}
                    onChange={(e) => handleCriteriaChange('transporterRatingThreshold', parseFloat(e.target.value))}
                    step={0.1}
                    min={0}
                    max={5}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            
            <Divider />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space direction="vertical" size={1}>
                <Text strong>Auto-Classification Rules</Text>
                <Text type="secondary">Trucks meeting all the above criteria will be automatically classified as Green Channel</Text>
              </Space>
              
              <Space>
                <Button>Reset to Defaults</Button>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
                >
                  Save Classification Rules
                </Button>
              </Space>
            </div>
            
            <div style={{ marginTop: 24 }}>
              <Alert
                message="Classification Override"
                description="You can manually override the automatic classification by using the 'Change to Green/Orange' action in the table above. Manual overrides will be logged for audit purposes."
                type="info"
                showIcon
              />
            </div>
          </Form>
        </Card>
      </div>
    </Space>
  );
};

export default TruckSettingsContent; 