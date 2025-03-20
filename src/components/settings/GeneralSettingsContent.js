import React from 'react';
import { 
  Typography, 
  Form, 
  Input, 
  Button, 
  Space, 
  Divider,
  Select,
  Upload,
  Row,
  Col
} from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const GeneralSettingsContent = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div className="section-header">
        <Title level={4}>System Preferences</Title>
        <Paragraph>Configure general system preferences.</Paragraph>
      </div>
      
      <div className="section-content">
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item 
                label="System Name" 
                tooltip={{ 
                  title: 'The name of the system displayed in various places', 
                  icon: <InfoCircleOutlined /> 
                }}
              >
                <Input defaultValue="TMS Dashboard" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item 
                label="Default Language" 
                tooltip={{ 
                  title: 'The default language for the system', 
                  icon: <InfoCircleOutlined /> 
                }}
              >
                <Select defaultValue="en">
                  <Option value="en">English</Option>
                  <Option value="hi">Hindi</Option>
                  <Option value="kn">Kannada</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item 
                label="Date Format" 
                tooltip={{ 
                  title: 'The format in which dates will be displayed', 
                  icon: <InfoCircleOutlined /> 
                }}
              >
                <Select defaultValue="dd/mm/yyyy">
                  <Option value="dd/mm/yyyy">DD/MM/YYYY</Option>
                  <Option value="mm/dd/yyyy">MM/DD/YYYY</Option>
                  <Option value="yyyy-mm-dd">YYYY-MM-DD</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item 
                label="Time Format" 
                tooltip={{ 
                  title: 'The format in which times will be displayed', 
                  icon: <InfoCircleOutlined /> 
                }}
              >
                <Select defaultValue="24h">
                  <Option value="24h">24 Hour</Option>
                  <Option value="12h">12 Hour (AM/PM)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item 
            label="Session Timeout (minutes)" 
            tooltip={{ 
              title: 'Inactive time after which users will be automatically logged out', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Input type="number" defaultValue="30" style={{ width: 200 }} />
          </Form.Item>
          
          <Button 
            type="primary" 
            style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
          >
            Save Changes
          </Button>
        </Form>
      </div>
      
      <Divider />
      
      <div className="section-header">
        <Title level={4}>Branding</Title>
        <Paragraph>Configure system branding and appearance.</Paragraph>
      </div>
      
      <div className="section-content">
        <Form layout="vertical">
          <Form.Item 
            label="System Logo" 
            tooltip={{ 
              title: 'The logo displayed in the header and other places', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Upload 
              listType="picture" 
              maxCount={1}
              action="/api/upload"
              defaultFileList={[{
                uid: '1',
                name: 'logo.png',
                status: 'done',
                url: 'https://via.placeholder.com/200x50',
              }]}
            >
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item>
          
          <Form.Item 
            label="Primary Color" 
            tooltip={{ 
              title: 'The primary color used throughout the system', 
              icon: <InfoCircleOutlined /> 
            }}
          >
            <Input type="color" defaultValue="#4f2170" style={{ width: 100 }} />
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

export default GeneralSettingsContent; 