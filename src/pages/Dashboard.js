import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Space, 
  Tag, 
  Button, 
  Progress, 
  Table, 
  Avatar, 
  Tooltip, 
  Dropdown, 
  Select,
  Badge,
  Modal,
  Tabs,
  Descriptions,
  Empty,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  RiseOutlined, 
  FallOutlined, 
  BarChartOutlined, 
  DotChartOutlined,
  AreaChartOutlined,
  CalendarOutlined,
  ReloadOutlined,
  SettingOutlined,
  EllipsisOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Import KPI data
import { kpiData, kpiCategories, kpiTrendData } from '../data/kpiData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// Generate realistic data for charts
const generatePerformanceData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => {
    const base = Math.floor(Math.random() * 50) + 50;
    return {
      day,
      actual: base + Math.floor(Math.random() * 20),
      target: base + 15,
      variance: Math.floor(Math.random() * 10)
    };
  });
};

const generateTruckStatusData = () => {
  return [
    { name: 'Active', value: 68, color: '#52c41a' },
    { name: 'Maintenance', value: 12, color: '#faad14' },
    { name: 'Inactive', value: 8, color: '#f5222d' },
    { name: 'Standby', value: 12, color: '#1890ff' }
  ];
};

// Recent activities data
const recentActivities = [
  {
    id: 1,
    user: 'John Doe',
    avatar: 'JD',
    action: 'Completed inspection',
    target: 'Truck TRK-2023-A',
    time: '10 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    user: 'Sarah Connor',
    avatar: 'SC',
    action: 'Updated records',
    target: 'Database maintenance',
    time: '25 minutes ago',
    status: 'processing'
  },
  {
    id: 3,
    user: 'Mike Richards',
    avatar: 'MR',
    action: 'Flagged issue',
    target: 'Camera #14 at RM Dock',
    time: '1 hour ago',
    status: 'warning'
  },
  {
    id: 4,
    user: 'Jane Smith',
    avatar: 'JS',
    action: 'Completed backup',
    target: 'System backup',
    time: '3 hours ago',
    status: 'success'
  },
  {
    id: 5,
    user: 'Robert Johnson',
    avatar: 'RJ',
    action: 'Scheduled maintenance',
    target: 'Server upgrade',
    time: '5 hours ago',
    status: 'processing'
  }
];

// Upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: 'System Maintenance',
    date: 'Tomorrow, 02:00 AM',
    type: 'maintenance',
    duration: '2 hours'
  },
  {
    id: 2,
    title: 'Quarterly Review',
    date: 'Sept 28, 10:00 AM',
    type: 'meeting',
    duration: '1 hour'
  },
  {
    id: 3,
    title: 'Software Update',
    date: 'Sept 30, 03:00 PM',
    type: 'update',
    duration: '45 minutes'
  }
];

// KPI Detail Modal Component
const KpiDetailModal = ({ visible, kpi, onClose }) => {
  const [activeTab, setActiveTab] = useState('1');
  
  if (!kpi) return null;
  
  // Get trend data for the KPI if available
  const trendData = kpiTrendData[kpi.id] || [];
  
  // Generate hourly data for today
  const generateHourlyData = () => {
    const hourlyData = [];
    const baseValue = kpi.value;
    const now = new Date();
    const hours = now.getHours();
    
    for (let i = 0; i <= 23; i++) {
      const variance = Math.random() * 6 - 3; // -3 to +3 variance
      const value = i <= hours ? 
        (baseValue + variance) : 
        null; // Only show data for hours that have passed
      
      hourlyData.push({
        hour: `${i}:00`,
        value: value
      });
    }
    
    return hourlyData;
  };
  
  // Generate detailed info
  const generateRelatedKpis = () => {
    const category = kpiCategories.find(cat => cat.kpis.includes(kpi.id));
    if (!category) return [];
    
    return kpiData
      .filter(k => k.id !== kpi.id && category.kpis.includes(k.id))
      .slice(0, 3);
  };
  
  const hourlyData = generateHourlyData();
  const relatedKpis = generateRelatedKpis();
  
  // Calculate stats for the KPI
  const calculateStats = () => {
    if (!trendData || trendData.length < 2) return { min: 0, max: 0, avg: 0 };
    
    const values = trendData.map(item => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    
    return { min, max, avg: Math.round(avg * 100) / 100 };
  };
  
  // Generate threshold information based on KPI type
  const getThresholdInfo = () => {
    // Determine thresholds based on KPI type
    if (kpi.id === 'tat' || kpi.id.includes('time') || kpi.id.includes('processing')) {
      // Time-based KPIs - lower is better
      return {
        good: { value: kpi.value * 0.9, label: 'Good', color: 'green' },
        warning: { value: kpi.value, label: 'Warning', color: 'gold' },
        critical: { value: kpi.value * 1.1, label: 'Critical', color: 'red' }
      };
    } else if (kpi.suffix === '%' && kpi.id !== 'deviation_acceptance') {
      // Percentage KPIs (except deviation) - higher is better
      return {
        critical: { value: kpi.value * 0.9, label: 'Critical', color: 'red' },
        warning: { value: kpi.value * 0.95, label: 'Warning', color: 'gold' },
        good: { value: kpi.value, label: 'Good', color: 'green' }
      };
    } else {
      // Count-based KPIs - context dependent
      const isNegativeMetric = kpi.id.includes('rejection') || kpi.id.includes('variance');
      if (isNegativeMetric) {
        // Lower is better for negative metrics
        return {
          good: { value: kpi.value * 0.9, label: 'Good', color: 'green' },
          warning: { value: kpi.value, label: 'Warning', color: 'gold' },
          critical: { value: kpi.value * 1.1, label: 'Critical', color: 'red' }
        };
      } else {
        // Higher is better for positive metrics
        return {
          critical: { value: kpi.value * 0.9, label: 'Critical', color: 'red' },
          warning: { value: kpi.value * 0.95, label: 'Warning', color: 'gold' },
          good: { value: kpi.value, label: 'Good', color: 'green' }
        };
      }
    }
  };
  
  const thresholds = getThresholdInfo();
  const stats = calculateStats();
  
  // Get recommended actions based on status
  const getRecommendedActions = () => {
    if (kpi.status === 'success') {
      return [
        'Monitor for consistency',
        'Consider sharing best practices with other areas',
        'Review for potential optimization opportunities'
      ];
    } else if (kpi.status === 'warning') {
      return [
        'Investigate potential root causes',
        'Schedule a team discussion to address concerns',
        'Monitor more frequently for the next week',
        'Implement preventive measures'
      ];
    } else {
      return [
        'Immediate action required: Schedule an urgent review',
        'Identify and address root causes',
        'Implement correction plan',
        'Daily monitoring until resolved'
      ];
    }
  };
  
  const actions = getRecommendedActions();
  
  return (
    <Modal
      title={<Title level={4}>{kpi.name} Details</Title>}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button 
          key="export" 
          type="primary" 
          ghost
          icon={<AreaChartOutlined />}
        >
          Export Data
        </Button>,
        <Button 
          key="submit" 
          type="primary"
          icon={<SettingOutlined />}
        >
          Configure Alerts
        </Button>,
      ]}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Overview" key="1">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={false} className="detail-metrics-card">
                <Space size="large">
                  <Statistic
                    title="Current Value"
                    value={kpi.value}
                    suffix={kpi.suffix}
                    valueStyle={{ 
                      color: kpi.status === 'success' ? '#52c41a' : 
                             kpi.status === 'warning' ? '#faad14' : 
                             '#f5222d',
                      fontSize: '28px'
                    }}
                  />
                  <Statistic
                    title="Average"
                    value={stats.avg}
                    suffix={kpi.suffix}
                    valueStyle={{ fontSize: '24px' }}
                  />
                  <Statistic
                    title="Min"
                    value={stats.min}
                    suffix={kpi.suffix}
                    valueStyle={{ fontSize: '24px' }}
                  />
                  <Statistic
                    title="Max"
                    value={stats.max}
                    suffix={kpi.suffix}
                    valueStyle={{ fontSize: '24px' }}
                  />
                  {kpi.trend && (
                    <Statistic
                      title="Trend"
                      value={kpi.trend > 0 ? `+${kpi.trend}%` : `${kpi.trend}%`}
                      prefix={kpi.trend > 0 ? <RiseOutlined /> : <FallOutlined />}
                      valueStyle={{ 
                        color: kpi.trend > 0 ? '#52c41a' : '#f5222d',
                        fontSize: '24px'
                      }}
                    />
                  )}
                </Space>
              </Card>
            </Col>
            
            <Col span={24}>
              <Alert
                message={`Current Status: ${kpi.status.toUpperCase()}`}
                description={
                  <div>
                    <p>{kpi.description}</p>
                    <p style={{ marginTop: 8 }}>
                      This KPI is currently {
                        kpi.status === 'success' ? 'performing well within target ranges.' :
                        kpi.status === 'warning' ? 'showing signs of potential issues that need attention.' :
                        'critical and requires immediate action.'
                      }
                    </p>
                  </div>
                }
                type={
                  kpi.status === 'success' ? 'success' :
                  kpi.status === 'warning' ? 'warning' :
                  'error'
                }
                showIcon
              />
            </Col>
            
            <Col span={24}>
              <Title level={5}>Historical Trend</Title>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => date.substring(5)} />
                  <YAxis domain={['auto', 'auto']} />
                  <RechartsTooltip 
                    formatter={(value) => [`${value}${kpi.suffix}`, kpi.name]}
                    labelFormatter={(date) => `Date: ${date}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8a4fff" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={3}
                    name={kpi.name} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Col>
            
            <Col span={24}>
              <Title level={5}>Today's Performance</Title>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis domain={['auto', 'auto']} />
                  <RechartsTooltip 
                    formatter={(value) => value ? [`${value}${kpi.suffix}`, 'Value'] : ['No data yet', '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8a4fff" 
                    fill="#8a4fff30" 
                    activeDot={{ r: 6 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab="Details" key="2">
          <Descriptions 
            bordered 
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Name">{kpi.name}</Descriptions.Item>
            <Descriptions.Item label="ID">{kpi.id}</Descriptions.Item>
            <Descriptions.Item label="Priority Level">{kpi.priority}</Descriptions.Item>
            <Descriptions.Item label="Granularity">{kpi.granularity}</Descriptions.Item>
            <Descriptions.Item label="Category">{kpi.category}</Descriptions.Item>
            <Descriptions.Item label="Description">{kpi.description}</Descriptions.Item>
            <Descriptions.Item label="Calculation Formula" span={2}>
              <Text code>{kpi.calculation}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={
                kpi.status === 'success' ? 'green' : 
                kpi.status === 'warning' ? 'gold' : 
                'red'
              }>
                {kpi.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trend">
              {kpi.trend > 0 ? 
                <Tag color="green" icon={<RiseOutlined />}>{`+${kpi.trend}%`}</Tag> : 
                <Tag color="red" icon={<FallOutlined />}>{`${kpi.trend}%`}</Tag>
              }
            </Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 24 }}>
            <Title level={5}>Threshold Values</Title>
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <Card bordered={false} style={{ backgroundColor: '#f6ffed', flex: 1 }}>
                <Statistic
                  title="Good"
                  value={thresholds.good.value.toFixed(1)}
                  suffix={kpi.suffix}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
              <Card bordered={false} style={{ backgroundColor: '#fffbe6', flex: 1 }}>
                <Statistic
                  title="Warning"
                  value={thresholds.warning.value.toFixed(1)}
                  suffix={kpi.suffix}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
              <Card bordered={false} style={{ backgroundColor: '#fff1f0', flex: 1 }}>
                <Statistic
                  title="Critical"
                  value={thresholds.critical.value.toFixed(1)}
                  suffix={kpi.suffix}
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </div>
          </div>
          
          <div style={{ marginTop: 24 }}>
            <Title level={5}>Recommended Actions</Title>
            <Alert
              message="Action Items"
              description={
                <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                  {actions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              }
              type={
                kpi.status === 'success' ? 'success' :
                kpi.status === 'warning' ? 'warning' :
                'error'
              }
              showIcon
            />
          </div>
        </TabPane>
        
        <TabPane tab="Related KPIs" key="3">
          {relatedKpis.length > 0 ? (
            <Row gutter={[16, 16]}>
              {relatedKpis.map(relatedKpi => (
                <Col key={relatedKpi.id} xs={24} md={8}>
                  <Card bordered={false} className="related-kpi-card">
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <Text strong>{relatedKpi.name}</Text>
                      <Statistic
                        value={relatedKpi.value}
                        suffix={relatedKpi.suffix}
                        valueStyle={{ 
                          color: relatedKpi.status === 'success' ? '#52c41a' : 
                                 relatedKpi.status === 'warning' ? '#faad14' : 
                                 '#f5222d',
                          fontSize: '24px'
                        }}
                      />
                      {relatedKpi.trend && (
                        <div className="kpi-secondary-value">
                          <Space>
                            {relatedKpi.trend > 0 ? 
                              <RiseOutlined style={{ color: '#52c41a' }} /> : 
                              <FallOutlined style={{ color: '#f5222d' }} />
                            }
                            <Text 
                              type={relatedKpi.trend > 0 ? 'success' : 'danger'}
                            >
                              {relatedKpi.trend > 0 ? `+${relatedKpi.trend}%` : `${relatedKpi.trend}%`} change
                            </Text>
                          </Space>
                        </div>
                      )}
                      <Text type="secondary">{relatedKpi.description}</Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="No related KPIs found" />
          )}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

// KPI Card component
const KpiCard = ({ title, value, suffix, prefix, status, trend, description, kpi, onClick }) => {
  // Determine color based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#f5222d';
      default: return '#1890ff';
    }
  };

  // Trend icon based on trend direction
  const getTrendIcon = (trend) => {
    if (trend > 0) return <RiseOutlined style={{ color: '#52c41a' }} />;
    if (trend < 0) return <FallOutlined style={{ color: '#f5222d' }} />;
    return null;
  };

  return (
    <Card 
      className="dashboard-kpi-card" 
      bordered={false}
      onClick={() => onClick && onClick(kpi)}
      hoverable
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div className="kpi-card-header">
          <Text className="kpi-card-title">{title}</Text>
          <Space>
            {status && (
              <Badge 
                status={status === 'normal' ? 'processing' : status} 
              />
            )}
            <InfoCircleOutlined className="kpi-info-icon" />
          </Space>
        </div>
        <div className="kpi-value-container">
          <Statistic
            value={value}
            suffix={suffix}
            prefix={prefix}
            valueStyle={{ 
              color: getStatusColor(status),
              fontSize: '28px'
            }}
          />
        </div>
        {trend !== undefined && (
          <div className="kpi-secondary-value">
            <Space>
              {getTrendIcon(trend)}
              <Text 
                type={trend > 0 ? 'success' : trend < 0 ? 'danger' : 'secondary'}
              >
                {trend > 0 ? `+${trend}%` : `${trend}%`} change
              </Text>
            </Space>
          </div>
        )}
        {description && (
          <div className="kpi-description">
            <Text type="secondary">{description}</Text>
          </div>
        )}
      </Space>
    </Card>
  );
};

// Chart Card component
const ChartCard = ({ title, children, extra }) => {
  return (
    <Card 
      className="dashboard-chart-card" 
      title={
        <div className="chart-card-header">
          <Text strong>{title}</Text>
        </div>
      }
      bordered={false}
      extra={extra}
    >
      <div className="chart-container">
        {children}
      </div>
    </Card>
  );
};

// Table for recent activities
const ActivityTable = ({ data }) => {
  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#4f2170' }}>{record.avatar}</Avatar>
          <Text>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Activity',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary">{record.target}</Text>
        </Space>
      )
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text) => (
        <Space>
          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
          <Text type="secondary">{text}</Text>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          success: { color: 'success', text: 'Completed', icon: <CheckCircleOutlined /> },
          processing: { color: 'processing', text: 'In Progress', icon: <ClockCircleOutlined /> },
          warning: { color: 'warning', text: 'Warning', icon: <WarningOutlined /> },
          error: { color: 'error', text: 'Failed', icon: <CloseCircleOutlined /> }
        };
        const { color, text, icon } = statusMap[status];
        return <Tag color={color} icon={icon}>{text}</Tag>;
      }
    }
  ];

  return (
    <Table 
      dataSource={data} 
      columns={columns} 
      pagination={false} 
      size="small"
      rowKey="id"
    />
  );
};

// Main Dashboard component
const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [refreshing, setRefreshing] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState(null);

  // Get key KPIs for the dashboard
  const tatKpi = kpiData.find(kpi => kpi.id === 'tat');
  const assetUtilKpi = kpiData.find(kpi => kpi.id === 'asset_utilization');
  const docComplianceKpi = kpiData.find(kpi => kpi.id === 'doc_compliance');
  const greenChannelKpi = kpiData.find(kpi => kpi.id === 'green_channel');
  
  // Get KPIs by priority
  const topKpis = kpiData
    .filter(kpi => kpi.level === 'Primary')
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 8);

  // Get trend data for charts
  const tatTrend = kpiTrendData.tat || [];
  const dockProcessingTrend = kpiTrendData.dock_processing || [];
  
  // Generate truck volume data
  const truckVolumeData = [
    { day: 'Mon', volume: 145 },
    { day: 'Tue', volume: 132 },
    { day: 'Wed', volume: 164 },
    { day: 'Thu', volume: 156 },
    { day: 'Fri', volume: 178 },
    { day: 'Sat', volume: 98 },
    { day: 'Sun', volume: 87 }
  ];

  // Processing time by channel
  const processingTimeData = [
    { name: 'Green Channel', time: greenChannelKpi?.value || 0 },
    { name: 'Non-Green Channel', time: kpiData.find(k => k.id === 'non_green_channel')?.value || 0 },
    { name: 'Dock Processing', time: kpiData.find(k => k.id === 'dock_processing')?.value || 0 },
    { name: 'Exit Processing', time: kpiData.find(k => k.id === 'exit_processing')?.value || 0 }
  ];

  // Efficiency scores calculation (simplified view for display)
  const efficiencyScores = {
    overall: 86,
    gateProcessing: 92,
    dockOperations: 84,
    documentChecks: 88,
    weightVerification: 90
  };

  // Performance data based on selected timeframe
  const performanceData = generatePerformanceData();
  const truckStatusData = generateTruckStatusData();

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // KPI comparison table columns
  const kpiColumns = [
    {
      title: 'Metric',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value, record) => `${value}${record.suffix}`
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend) => (
        <Space>
          {trend > 0 ? 
            <Tag color="success" icon={<RiseOutlined />}>{`+${trend}%`}</Tag> : 
            <Tag color="error" icon={<FallOutlined />}>{`${trend}%`}</Tag>
          }
        </Space>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        const statusMap = {
          success: { color: 'success', text: 'Good' },
          warning: { color: 'warning', text: 'Warning' },
          error: { color: 'error', text: 'Critical' }
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      }
    }
  ];

  // Handle KPI card click
  const handleKpiClick = (kpi) => {
    setSelectedKpi(kpi);
    setDetailVisible(true);
  };

  // Handle closing the detail modal
  const handleDetailClose = () => {
    setDetailVisible(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <Title level={2} className="dashboard-title">Transport KPI Dashboard</Title>
            <Text type="secondary">Overview of key truck processing and efficiency metrics</Text>
          </Col>
          <Col>
            <Space>
              <Select 
                defaultValue="weekly" 
                style={{ width: 120 }} 
                onChange={value => setTimeframe(value)}
              >
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="quarterly">Quarterly</Option>
              </Select>
              <Button 
                icon={refreshing ? <ReloadOutlined spin /> : <ReloadOutlined />} 
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Primary KPI Cards */}
      <Row gutter={[16, 16]} className="dashboard-kpi-row">
        <Col xs={24} sm={12} md={6}>
          <KpiCard 
            title={tatKpi?.name}
            value={tatKpi?.value}
            suffix={tatKpi?.suffix}
            status={tatKpi?.status}
            trend={tatKpi?.trend}
            description={tatKpi?.description}
            kpi={tatKpi}
            onClick={handleKpiClick}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <KpiCard 
            title={assetUtilKpi?.name}
            value={assetUtilKpi?.value}
            suffix={assetUtilKpi?.suffix}
            status={assetUtilKpi?.status}
            trend={assetUtilKpi?.trend}
            description={assetUtilKpi?.description}
            kpi={assetUtilKpi}
            onClick={handleKpiClick}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <KpiCard 
            title={docComplianceKpi?.name}
            value={docComplianceKpi?.value}
            suffix={docComplianceKpi?.suffix}
            status={docComplianceKpi?.status}
            trend={docComplianceKpi?.trend}
            description={docComplianceKpi?.description}
            kpi={docComplianceKpi}
            onClick={handleKpiClick}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <KpiCard 
            title={greenChannelKpi?.name}
            value={greenChannelKpi?.value}
            suffix={greenChannelKpi?.suffix}
            status={greenChannelKpi?.status}
            trend={greenChannelKpi?.trend}
            description={greenChannelKpi?.description}
            kpi={greenChannelKpi}
            onClick={handleKpiClick}
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="dashboard-charts-row">
        <Col xs={24} md={12}>
          <ChartCard 
            title="Truck Turnaround Time Trend" 
            extra={
              <Dropdown
                menu={{
                  items: [
                    { key: '1', label: 'View Details' },
                    { key: '2', label: 'Export Data' },
                    { key: '3', label: 'Set Alerts' }
                  ]
                }}
                placement="bottomRight"
              >
                <Button type="text" icon={<EllipsisOutlined />} />
              </Dropdown>
            }
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tatTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(date) => date.substring(5)} />
                <YAxis domain={['auto', 'auto']} />
                <RechartsTooltip 
                  formatter={(value) => [`${value} min`, 'TAT']}
                  labelFormatter={(date) => `Date: ${date}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8a4fff" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={3}
                  name="TAT" 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
        <Col xs={24} md={12}>
          <ChartCard 
            title="Truck Volume by Day" 
            extra={
              <Dropdown
                menu={{
                  items: [
                    { key: '1', label: 'View Details' },
                    { key: '2', label: 'Export Data' }
                  ]
                }}
                placement="bottomRight"
              >
                <Button type="text" icon={<EllipsisOutlined />} />
              </Dropdown>
            }
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={truckVolumeData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <RechartsTooltip formatter={(value) => [`${value} trucks`, 'Volume']} />
                <Bar dataKey="volume" fill="#1890ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
      </Row>

      {/* Second Row of Charts */}
      <Row gutter={[16, 16]} className="dashboard-charts-row">
        <Col xs={24} md={12}>
          <ChartCard 
            title="Processing Time by Channel" 
            extra={
              <Button type="text" icon={<EllipsisOutlined />} />
            }
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={processingTimeData} layout="vertical" barSize={30}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <RechartsTooltip formatter={(value) => [`${value} min`, 'Processing Time']} />
                <Bar 
                  dataKey="time" 
                  fill="#8a4fff" 
                  radius={[0, 4, 4, 0]}
                  label={{ position: 'right', formatter: (value) => `${value} min` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
        <Col xs={24} md={12}>
          <ChartCard 
            title="Efficiency Scores" 
            extra={
              <Button type="text" icon={<EllipsisOutlined />} />
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, padding: '10px 20px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text>Overall Efficiency</Text>
                  <Text>{efficiencyScores.overall}%</Text>
                </div>
                <Progress 
                  percent={efficiencyScores.overall} 
                  strokeColor="#8a4fff"
                  showInfo={false}
                  strokeWidth={8}
                />
              </Space>
              
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text>Gate Processing</Text>
                  <Text>{efficiencyScores.gateProcessing}%</Text>
                </div>
                <Progress 
                  percent={efficiencyScores.gateProcessing} 
                  strokeColor="#52c41a"
                  showInfo={false}
                  strokeWidth={8}
                />
              </Space>
              
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text>Dock Operations</Text>
                  <Text>{efficiencyScores.dockOperations}%</Text>
                </div>
                <Progress 
                  percent={efficiencyScores.dockOperations} 
                  strokeColor="#1890ff"
                  showInfo={false}
                  strokeWidth={8}
                />
              </Space>
              
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text>Document Checks</Text>
                  <Text>{efficiencyScores.documentChecks}%</Text>
                </div>
                <Progress 
                  percent={efficiencyScores.documentChecks} 
                  strokeColor="#fa8c16"
                  showInfo={false}
                  strokeWidth={8}
                />
              </Space>
            </div>
          </ChartCard>
        </Col>
      </Row>

      {/* KPI Table */}
      <Row gutter={[16, 16]} className="dashboard-charts-row">
        <Col xs={24}>
          <Card 
            title="All Primary KPIs" 
            bordered={false}
            className="dashboard-table-card"
            extra={
              <Button type="link" icon={<AreaChartOutlined />}>
                View Trends
              </Button>
            }
          >
            <Table 
              dataSource={topKpis} 
              columns={kpiColumns} 
              pagination={false}
              size="small"
              rowKey="id"
              onRow={(record) => {
                return {
                  onClick: () => handleKpiClick(record),
                  style: { cursor: 'pointer' }
                };
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Bottom Rows */}
      <Row gutter={[16, 16]} className="dashboard-bottom-row">
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Activities" 
            bordered={false}
            className="dashboard-table-card"
            extra={
              <Button type="link">View All</Button>
            }
          >
            <ActivityTable data={recentActivities} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="KPI Categories" 
            bordered={false}
            className="dashboard-table-card"
            extra={
              <Button type="link">View Details</Button>
            }
          >
            {kpiCategories.map(category => (
              <div key={category.id} className="category-item">
                <Title level={5}>{category.name}</Title>
                <Paragraph type="secondary">{category.description}</Paragraph>
                <div className="category-kpis">
                  {category.kpis.map(kpiId => {
                    const kpi = kpiData.find(k => k.id === kpiId);
                    if (!kpi) return null;
                    return (
                      <Tag 
                        key={kpiId} 
                        color={
                          kpi.status === 'success' ? 'green' : 
                          kpi.status === 'warning' ? 'gold' : 
                          'red'
                        }
                        onClick={() => handleKpiClick(kpi)}
                        style={{ cursor: 'pointer' }}
                      >
                        {kpi.name}: {kpi.value}{kpi.suffix}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-bottom-row">
        <Col xs={24}>
          <Card 
            title="Real-time Insights" 
            bordered={false}
            className="dashboard-table-card"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card className="insight-card" bordered={false}>
                  <Space direction="vertical" size="small">
                    <Title level={4}>Bottleneck Analysis</Title>
                    <Paragraph>
                      The current bottleneck appears to be in the non-green channel processing, 
                      which is taking {kpiData.find(k => k.id === 'non_green_channel')?.value} minutes 
                      on average. This is {Math.round((kpiData.find(k => k.id === 'non_green_channel')?.value || 0) / 
                      (kpiData.find(k => k.id === 'green_channel')?.value || 1) * 10) / 10}x longer than 
                      green channel processing.
                    </Paragraph>
                    <Button type="primary">View Analysis</Button>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="insight-card" bordered={false}>
                  <Space direction="vertical" size="small">
                    <Title level={4}>Optimization Opportunity</Title>
                    <Paragraph>
                      Asset utilization rate could be improved by optimizing dock scheduling. 
                      Current utilization is at {assetUtilKpi?.value}%, with potential to reach 85%+ 
                      based on historical data.
                    </Paragraph>
                    <Button type="primary">View Recommendation</Button>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="insight-card" bordered={false}>
                  <Space direction="vertical" size="small">
                    <Title level={4}>Forecasted Trends</Title>
                    <Paragraph>
                      Based on current patterns, we predict a 7% increase in truck volume next week 
                      with a potential 4% reduction in TAT if recent process improvements continue.
                    </Paragraph>
                    <Button type="primary">View Forecast</Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* KPI Detail Modal */}
      <KpiDetailModal 
        visible={detailVisible}
        kpi={selectedKpi}
        onClose={handleDetailClose}
      />
    </div>
  );
};

export default Dashboard;