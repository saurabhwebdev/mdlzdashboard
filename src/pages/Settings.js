import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Space, 
  Divider,
  Select,
  Upload,
  Table,
  Tag,
  message,
  Row,
  Col,
  Radio,
  Tooltip,
  Alert,
  Modal,
  Empty,
  Descriptions
} from 'antd';
import { 
  UserOutlined, 
  BellOutlined, 
  SettingOutlined, 
  CarOutlined, 
  TeamOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  LockOutlined,
  NotificationOutlined,
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  SwapOutlined,
  StopOutlined,
  EditOutlined,
  AuditOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  TruckOutlined
} from '@ant-design/icons';

// Import settings components
import GeneralSettingsContent from '../components/settings/GeneralSettingsContent';
import TruckSettingsContent from '../components/settings/TruckSettingsContent';
import TransporterSettingsContent from '../components/settings/TransporterSettingsContent';
import UserSettingsContent from '../components/settings/UserSettingsContent';
import AlertSettingsContent from '../components/settings/AlertSettingsContent';
import AuditSettingsContent from '../components/settings/AuditSettingsContent';
import ApprovalsSettingsContent from '../components/settings/ApprovalsSettingsContent';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [truckTypesData, setTruckTypesData] = useState([
    { id: 1, name: 'Standard Trailer', capacity: '40 tons', status: 'active', classification: 'green', blacklisted: false },
    { id: 2, name: 'Refrigerated Truck', capacity: '35 tons', status: 'active', classification: 'orange', blacklisted: false },
    { id: 3, name: 'Flatbed Truck', capacity: '45 tons', status: 'inactive', classification: 'green', blacklisted: true },
    { id: 4, name: 'Tanker', capacity: '38 tons', status: 'active', classification: 'orange', blacklisted: false },
  ]);

  // Classification change modal state
  const [classificationModal, setClassificationModal] = useState({
    visible: false,
    truck: null,
    reason: '',
  });
  
  // Handle opening the classification change modal
  const showClassificationModal = (record) => {
    setClassificationModal({
      visible: true,
      truck: record,
      reason: '',
    });
  };
  
  // Handle closing the classification change modal
  const closeClassificationModal = () => {
    setClassificationModal({
      ...classificationModal,
      visible: false,
    });
  };
  
  // Handle classification reason change
  const handleReasonChange = (e) => {
    setClassificationModal({
      ...classificationModal,
      reason: e.target.value,
    });
  };
  
  // Handle changing truck classification between green and orange
  const handleChangeClassification = () => {
    const { truck, reason } = classificationModal;
    if (!truck) return;
    
    const newClassification = truck.classification === 'green' ? 'orange' : 'green';
    const updatedTruckTypes = truckTypesData.map(item => {
      if (item.id === truck.id) {
        return {
          ...item,
          classification: newClassification
        };
      }
      return item;
    });
    
    setTruckTypesData(updatedTruckTypes);
    
    // In a real application, you would save the reason to a database
    message.success(`Changed ${truck.name} to ${newClassification === 'green' ? 'Green' : 'Orange'} Channel`);
    closeClassificationModal();
  };

  // Blacklist modal state
  const [blacklistModal, setBlacklistModal] = useState({
    visible: false,
    item: null,
    type: '', // 'truck' or 'transporter'
    reason: '',
  });
  
  // Handle opening the blacklist modal
  const showBlacklistModal = (record, type) => {
    setBlacklistModal({
      visible: true,
      item: record,
      type: type,
      reason: '',
    });
  };
  
  // Handle closing the blacklist modal
  const closeBlacklistModal = () => {
    setBlacklistModal({
      ...blacklistModal,
      visible: false,
    });
  };
  
  // Handle blacklist reason change
  const handleBlacklistReasonChange = (e) => {
    setBlacklistModal({
      ...blacklistModal,
      reason: e.target.value,
    });
  };
  
  // Handle adding/removing item to/from blacklist
  const handleBlacklist = () => {
    const { item, type, reason } = blacklistModal;
    if (!item) return;
    
    const isRemoving = item.blacklisted;
    
    if (type === 'truck') {
      const updatedTruckTypes = truckTypesData.map(truck => {
        if (truck.id === item.id) {
          return {
            ...truck,
            blacklisted: !truck.blacklisted
          };
        }
        return truck;
      });
      
      setTruckTypesData(updatedTruckTypes);
      message.success(`${isRemoving ? 'Removed' : 'Added'} ${item.name} ${isRemoving ? 'from' : 'to'} blacklist`);
    } else if (type === 'transporter') {
      const updatedTransporters = transportersData.map(transporter => {
        if (transporter.id === item.id) {
          return {
            ...transporter,
            blacklisted: !transporter.blacklisted
          };
        }
        return transporter;
      });
      
      setTransportersData(updatedTransporters);
      message.success(`${isRemoving ? 'Removed' : 'Added'} ${item.name} ${isRemoving ? 'from' : 'to'} blacklist`);
    }
    
    // In a real application, you would save the reason to a database
    closeBlacklistModal();
  };

  // Dummy data for other tables
  const [transportersData, setTransportersData] = useState([
    { id: 1, name: 'ABC Logistics', contact: 'John Smith', phone: '555-1234', status: 'active', blacklisted: false },
    { id: 2, name: 'XYZ Transport', contact: 'Jane Doe', phone: '555-5678', status: 'active', blacklisted: false },
    { id: 3, name: 'Fast Freight', contact: 'Robert Johnson', phone: '555-9012', status: 'pending', blacklisted: true },
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Operator', status: 'active' },
    { id: 3, name: 'Mike Jones', email: 'mike.jones@example.com', role: 'Viewer', status: 'inactive' },
  ]);

  const [alertSettings, setAlertSettings] = useState([
    { id: 1, name: 'TAT Threshold Exceeded', description: 'Alert when TAT exceeds threshold', enabled: true },
    { id: 2, name: 'Document Compliance', description: 'Alert on document compliance issues', enabled: true },
    { id: 3, name: 'System Outage', description: 'Alert on system component failures', enabled: true },
    { id: 4, name: 'Low Asset Utilization', description: 'Alert when asset utilization falls below target', enabled: false },
  ]);

  // Classification criteria
  const [classificationCriteria, setClassificationCriteria] = useState({
    documentComplianceThreshold: 95,
    previousVisitThreshold: 5,
    transporterRatingThreshold: 4
  });

  // Handle classification criteria change
  const handleCriteriaChange = (field, value) => {
    setClassificationCriteria({
      ...classificationCriteria,
      [field]: value
    });
  };

  // Table columns configurations
  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'purple' : role === 'Operator' ? 'blue' : 'green'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />} className="action-icon-button" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" size="small" danger icon={<DeleteOutlined />} className="action-icon-button" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const truckColumns = [
    {
      title: 'Type Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification',
      render: (classification, record) => (
        <Tag color={classification === 'green' ? 'green' : 'orange'}>
          {classification === 'green' ? 'Green Channel' : 'Orange Channel'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Blacklisted',
      dataIndex: 'blacklisted',
      key: 'blacklisted',
      render: (blacklisted) => (
        <Tag className={blacklisted ? 'blacklisted-tag' : 'allowed-tag'}>
          {blacklisted ? 'Blacklisted' : 'Allowed'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title={record.classification === 'green' ? 'Change to Orange Channel' : 'Change to Green Channel'}>
            <Button 
              type="text" 
              size="small" 
              onClick={() => showClassificationModal(record)}
              className="action-icon-button"
              icon={record.classification === 'green' ? 
                <Tag color="orange"><SwapOutlined /></Tag> : 
                <Tag color="green"><SwapOutlined /></Tag>
              }
            />
          </Tooltip>
          <Tooltip title={record.blacklisted ? 'Remove from Blacklist' : 'Add to Blacklist'}>
            <Button 
              type="text" 
              size="small"
              danger={!record.blacklisted}
              onClick={() => showBlacklistModal(record, 'truck')}
              className="action-icon-button"
              icon={record.blacklisted ? <CheckCircleOutlined /> : <StopOutlined />}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />} className="action-icon-button" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" size="small" danger icon={<DeleteOutlined />} className="action-icon-button" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const transporterColumns = [
    {
      title: 'Transporter Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'active' ? 'green' : 
          status === 'pending' ? 'gold' : 'red'
        }>
          {status === 'active' ? 'Active' : 
           status === 'pending' ? 'Pending' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Blacklisted',
      dataIndex: 'blacklisted',
      key: 'blacklisted',
      render: (blacklisted) => (
        <Tag className={blacklisted ? 'blacklisted-tag' : 'allowed-tag'}>
          {blacklisted ? 'Blacklisted' : 'Allowed'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title={record.blacklisted ? 'Remove from Blacklist' : 'Add to Blacklist'}>
            <Button 
              type="text" 
              size="small"
              danger={!record.blacklisted}
              onClick={() => showBlacklistModal(record, 'transporter')}
              className="action-icon-button"
              icon={record.blacklisted ? <CheckCircleOutlined /> : <StopOutlined />}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />} className="action-icon-button" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" size="small" danger icon={<DeleteOutlined />} className="action-icon-button" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const alertColumns = [
    {
      title: 'Alert Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => (
        <Switch checked={enabled} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Configure">
            <Button type="text" size="small" icon={<SettingOutlined />} className="action-icon-button" />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />} className="action-icon-button" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: '1',
      label: <span className="tab-label"><SettingOutlined /> General</span>,
      children: <GeneralSettingsContent />
    },
    {
      key: '2',
      label: <span className="tab-label"><TruckOutlined /> Truck Types</span>,
      children: <TruckSettingsContent 
        truckTypesData={truckTypesData}
        truckColumns={truckColumns}
        classificationCriteria={classificationCriteria}
        handleCriteriaChange={handleCriteriaChange}
        showClassificationModal={showClassificationModal}
        showBlacklistModal={showBlacklistModal}
      />
    },
    {
      key: '3',
      label: <span className="tab-label"><TeamOutlined /> Transporters</span>,
      children: <TransporterSettingsContent 
        transportersData={transportersData}
        transporterColumns={transporterColumns}
      />
    },
    {
      key: '4',
      label: <span className="tab-label"><UserOutlined /> Users</span>,
      children: <UserSettingsContent 
        users={users}
        userColumns={userColumns}
      />
    },
    {
      key: '5',
      label: <span className="tab-label"><BellOutlined /> Alerts</span>,
      children: <AlertSettingsContent 
        alertSettings={alertSettings}
        alertColumns={alertColumns}
      />
    },
    {
      key: '6',
      label: <span className="tab-label"><AuditOutlined /> Audit Trail</span>,
      children: <AuditSettingsContent />
    },
    {
      key: '7',
      label: <span className="tab-label"><CheckCircleOutlined /> Approvals</span>,
      children: <ApprovalsSettingsContent />
    },
  ];

  return (
    <div className="settings-container">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Settings</Title>
        <Paragraph>Configure system settings and manage various modules.</Paragraph>
        
        <Card bordered={false} className="settings-card">
          <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
        </Card>
      </Space>
      
      {/* Modal for changing truck classification */}
      <Modal
        title={
          <span>
            Change Classification to {
              classificationModal.truck?.classification === 'green' ? 'Orange' : 'Green'
            } Channel
          </span>
        }
        open={classificationModal.visible}
        onCancel={closeClassificationModal}
        className="classification-modal"
        footer={[
          <Button key="cancel" onClick={closeClassificationModal}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleChangeClassification}
            style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
            disabled={!classificationModal.reason}
          >
            Change Classification
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>
              You are about to change the classification of <strong>{classificationModal.truck?.name}</strong> from{' '}
              <Tag color={classificationModal.truck?.classification === 'green' ? 'green' : 'orange'}>
                {classificationModal.truck?.classification === 'green' ? 'Green Channel' : 'Orange Channel'}
              </Tag> to{' '}
              <Tag color={classificationModal.truck?.classification === 'green' ? 'orange' : 'green'}>
                {classificationModal.truck?.classification === 'green' ? 'Orange Channel' : 'Green Channel'}
              </Tag>
            </Text>
            
            <Alert
              message="Classification Change Impact"
              description={
                classificationModal.truck?.classification === 'green' 
                  ? "Changing to Orange Channel will subject trucks of this type to additional checks and potentially longer processing times."
                  : "Changing to Green Channel will allow trucks of this type to undergo expedited processing with fewer checks."
              }
              type="warning"
              showIcon
              style={{ marginBottom: 16, marginTop: 8 }}
            />
            
            <Form.Item 
              label="Reason for Classification Change" 
              required
              rules={[{ required: true, message: 'Please provide a reason for this change' }]}
              help="This information will be logged for audit purposes"
            >
              <Input.TextArea 
                rows={4} 
                value={classificationModal.reason}
                onChange={handleReasonChange}
                placeholder="Explain why you are changing the classification of this truck type..."
              />
            </Form.Item>
          </Space>
        </div>
      </Modal>
      
      {/* Modal for adding/removing item to/from blacklist */}
      <Modal
        title={
          <span>
            {blacklistModal.item?.blacklisted 
              ? `Remove ${blacklistModal.item?.name} from Blacklist` 
              : `Add ${blacklistModal.item?.name} to Blacklist`}
          </span>
        }
        open={blacklistModal.visible}
        onCancel={closeBlacklistModal}
        className="blacklist-modal"
        footer={[
          <Button key="cancel" onClick={closeBlacklistModal}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleBlacklist}
            style={{ backgroundColor: '#4f2170', borderColor: '#4f2170' }}
            disabled={!blacklistModal.reason}
          >
            {blacklistModal.item?.blacklisted ? 'Remove from Blacklist' : 'Add to Blacklist'}
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>
              {blacklistModal.item?.blacklisted 
                ? `Are you sure you want to remove ${blacklistModal.item?.name} from the blacklist?` 
                : `Are you sure you want to add ${blacklistModal.item?.name} to the blacklist?`}
            </Text>
            
            <Alert
              message="Blacklist Change Impact"
              description={
                blacklistModal.item?.blacklisted 
                  ? `Removing ${blacklistModal.item?.name} from the blacklist will allow it to be processed normally.` 
                  : `Adding ${blacklistModal.item?.name} to the blacklist will prevent it from being processed.`
              }
              type="warning"
              showIcon
              style={{ marginBottom: 16, marginTop: 8 }}
            />
            
            <Form.Item 
              label="Reason for Blacklist Change" 
              required
              rules={[{ required: true, message: 'Please provide a reason for this change' }]}
              help="This information will be logged for audit purposes"
            >
              <Input.TextArea 
                rows={4} 
                value={blacklistModal.reason}
                onChange={handleBlacklistReasonChange}
                placeholder="Explain why you are adding/removing this item to/from the blacklist..."
              />
            </Form.Item>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default Settings; 