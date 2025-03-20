import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Table, 
  Tag, 
  Tabs, 
  Row, 
  Col,
  Empty,
  Modal,
  Descriptions,
  Form,
  Input,
  Alert,
  Tooltip,
  message
} from 'antd';
import { 
  EyeOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ApprovalsSettingsContent = () => {
  // Sample data for pending approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      type: 'Plant Entry Violation',
      truckNumber: 'MH04 AB 1234',
      transporter: 'ABC Logistics',
      driver: 'Ramesh Kumar',
      violationTime: '2023-08-10 14:30',
      violationType: 'Document Compliance',
      status: 'pending',
      description: 'Driver attempted entry without valid safety certification'
    },
    {
      id: 2,
      type: 'Weight Violation',
      truckNumber: 'GJ05 CD 5678',
      transporter: 'XYZ Transport',
      driver: 'Suresh Singh',
      violationTime: '2023-08-11 09:45',
      violationType: 'Overweight',
      status: 'pending',
      description: 'Truck exceeded maximum allowed weight by 1.5 tons'
    },
    {
      id: 3,
      type: 'Security Protocol Violation',
      truckNumber: 'DL02 EF 9012',
      transporter: 'Fast Freight',
      driver: 'Dinesh Patel',
      violationTime: '2023-08-11 16:20',
      violationType: 'Security Check',
      status: 'pending',
      description: 'Driver refused to comply with security screening procedures'
    },
  ]);
  
  // State for the currently viewed violation details
  const [viewingViolation, setViewingViolation] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  
  // State for the approval/rejection modal
  const [actionModal, setActionModal] = useState({
    visible: false,
    violation: null,
    action: '', // 'approve' or 'reject'
    reason: '',
  });
  
  // Handle opening the details modal
  const showDetailsModal = (record) => {
    setViewingViolation(record);
    setDetailsModalVisible(true);
  };
  
  // Handle closing the details modal
  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
  };
  
  // Handle opening the action modal
  const showActionModal = (record, action) => {
    setActionModal({
      visible: true,
      violation: record,
      action: action,
      reason: '',
    });
  };
  
  // Handle closing the action modal
  const closeActionModal = () => {
    setActionModal({
      ...actionModal,
      visible: false,
    });
  };
  
  // Handle reason change in action modal
  const handleReasonChange = (e) => {
    setActionModal({
      ...actionModal,
      reason: e.target.value,
    });
  };
  
  // Handle approval or rejection action
  const handleApprovalAction = () => {
    const { violation, action, reason } = actionModal;
    
    // Update the status of the selected violation
    const updatedApprovals = pendingApprovals.map(item => {
      if (item.id === violation.id) {
        return {
          ...item,
          status: action === 'approve' ? 'approved' : 'rejected',
          actionReason: reason,
          actionTime: new Date().toISOString()
        };
      }
      return item;
    });
    
    // Filter out the processed approval if needed
    // In a real application, you might want to move it to a history section instead
    const filteredApprovals = updatedApprovals.filter(item => item.status === 'pending');
    
    setPendingApprovals(filteredApprovals);
    message.success(`Violation ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    closeActionModal();
  };
  
  // Table columns configuration
  const approvalColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Truck Number',
      dataIndex: 'truckNumber',
      key: 'truckNumber',
    },
    {
      title: 'Transporter',
      dataIndex: 'transporter',
      key: 'transporter',
    },
    {
      title: 'Violation Time',
      dataIndex: 'violationTime',
      key: 'violationTime',
    },
    {
      title: 'Violation Type',
      dataIndex: 'violationType',
      key: 'violationType',
      render: (text) => (
        <Tag color="red">{text}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 240,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button type="text" size="small" icon={<EyeOutlined />} className="action-icon-button" onClick={() => showDetailsModal(record)} />
          </Tooltip>
          <Tooltip title="Approve">
            <Button type="text" size="small" icon={<CheckCircleOutlined />} className="action-icon-button" style={{ color: '#52c41a' }} onClick={() => showActionModal(record, 'approve')} />
          </Tooltip>
          <Tooltip title="Reject">
            <Button type="text" size="small" danger icon={<CloseCircleOutlined />} className="action-icon-button" onClick={() => showActionModal(record, 'reject')} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div className="section-header">
        <Title level={4}>Pending Approval Requests</Title>
        <Paragraph>Review and take action on violation reports that require approval.</Paragraph>
      </div>
      
      <Tabs defaultActiveKey="pending" type="card">
        <Tabs.TabPane tab="Pending Approvals" key="pending">
          <div className="section-content">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card bordered={false} className="approval-list-card">
                  {pendingApprovals.length > 0 ? (
                    <Table 
                      columns={approvalColumns} 
                      dataSource={pendingApprovals} 
                      rowKey="id"
                      pagination={{ pageSize: 10 }}
                    />
                  ) : (
                    <Empty description="No pending approval requests" />
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Approval History" key="history">
          <div className="section-content">
            <Empty description="No approval history available" />
          </div>
        </Tabs.TabPane>
      </Tabs>
      
      {/* Violation Details Modal */}
      <Modal
        title={
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '18px' }}>{viewingViolation?.type}</Text>
            <Text type="secondary">{viewingViolation?.truckNumber} - {viewingViolation?.transporter}</Text>
          </Space>
        }
        open={detailsModalVisible}
        onCancel={closeDetailsModal}
        width={700}
        footer={[
          <Button key="close" onClick={closeDetailsModal}>
            Close
          </Button>,
          <Button 
            key="approve" 
            type="primary" 
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            onClick={() => { 
              closeDetailsModal(); 
              showActionModal(viewingViolation, 'approve'); 
            }}
          >
            Approve
          </Button>,
          <Button 
            key="reject" 
            danger
            onClick={() => { 
              closeDetailsModal(); 
              showActionModal(viewingViolation, 'reject'); 
            }}
          >
            Reject
          </Button>,
        ]}
      >
        {viewingViolation && (
          <div style={{ paddingTop: '12px' }}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Violation Type" span={2}>
                <Tag color="red">{viewingViolation.violationType}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Driver Name">
                {viewingViolation.driver}
              </Descriptions.Item>
              <Descriptions.Item label="Violation Time">
                {viewingViolation.violationTime}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {viewingViolation.description}
              </Descriptions.Item>
            </Descriptions>
            
            <div style={{ marginTop: '24px' }}>
              <Title level={5}>Violation Evidence</Title>
              <div className="approval-evidence">
                <Card 
                  hoverable 
                  className="approval-evidence-card"
                  cover={<img alt="violation evidence" src="https://via.placeholder.com/200x150?text=Evidence+Photo" />}
                >
                  <Card.Meta title="Gate Camera" description="Timestamp: 14:30:25" />
                </Card>
                <Card 
                  hoverable 
                  className="approval-evidence-card"
                  cover={<img alt="violation evidence" src="https://via.placeholder.com/200x150?text=Evidence+Photo" />}
                >
                  <Card.Meta title="Document Scan" description="Timestamp: 14:30:40" />
                </Card>
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Approval/Rejection Action Modal */}
      <Modal
        title={
          <span>
            {actionModal.action === 'approve' ? 'Approve Violation' : 'Reject Violation'}
          </span>
        }
        open={actionModal.visible}
        onCancel={closeActionModal}
        className="approval-action-modal"
        footer={[
          <Button key="cancel" onClick={closeActionModal}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleApprovalAction}
            style={{ 
              backgroundColor: actionModal.action === 'approve' ? '#52c41a' : undefined,
              borderColor: actionModal.action === 'approve' ? '#52c41a' : undefined,
            }}
            danger={actionModal.action === 'reject'}
            disabled={!actionModal.reason}
          >
            {actionModal.action === 'approve' ? 'Approve' : 'Reject'}
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {actionModal.violation && (
              <Alert
                message={`${actionModal.action === 'approve' ? 'Approving' : 'Rejecting'} ${actionModal.violation.type}`}
                description={`Truck: ${actionModal.violation.truckNumber} | Transporter: ${actionModal.violation.transporter}`}
                type={actionModal.action === 'approve' ? 'success' : 'error'}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            
            <Form.Item 
              label="Reason for Decision" 
              required
              rules={[{ required: true, message: 'Please provide a reason for your decision' }]}
              help="This information will be logged for audit purposes"
            >
              <Input.TextArea 
                rows={4} 
                value={actionModal.reason}
                onChange={handleReasonChange}
                placeholder={`Explain why you are ${actionModal.action === 'approve' ? 'approving' : 'rejecting'} this violation...`}
              />
            </Form.Item>
          </Space>
        </div>
      </Modal>
    </Space>
  );
};

export default ApprovalsSettingsContent; 