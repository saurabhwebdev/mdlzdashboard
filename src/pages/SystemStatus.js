import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Space, 
  Tag,
  Alert,
  Table,
  Badge,
  Tabs
} from 'antd';
import { 
  CheckCircleOutlined, 
  SyncOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  CameraOutlined,
  ReloadOutlined,
  DashboardOutlined,
  SettingOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Dummy data for system status
/* Commented out as unused
const systemMetrics = {
  serverUptime: 99.98,
  responseTime: 120, // ms
  cpuUsage: 45, // percentage
  memoryUsage: 62, // percentage
  diskUsage: 38, // percentage
  activeUsers: 237,
  requestsPerSecond: 45.8,
  errorRate: 0.02, // percentage
  databaseConnections: 28
};
*/

// Dummy system events
/* Commented out as unused
const systemEvents = [
  { 
    time: '2023-03-19 14:32:05', 
    event: 'System backup completed', 
    status: 'success',
    icon: <CheckCircleOutlined /> 
  },
  { 
    time: '2023-03-19 13:15:23', 
    event: 'Application deployment', 
    status: 'success',
    icon: <CheckCircleOutlined /> 
  },
  { 
    time: '2023-03-19 10:42:17', 
    event: 'Database optimization running', 
    status: 'processing',
    icon: <SyncOutlined spin /> 
  },
  { 
    time: '2023-03-19 08:05:39', 
    event: 'High CPU usage detected', 
    status: 'warning',
    icon: <WarningOutlined /> 
  },
  { 
    time: '2023-03-18 23:17:52', 
    event: 'System maintenance', 
    status: 'success',
    icon: <CheckCircleOutlined /> 
  }
];
*/

// Dummy server data for table
/* Commented out as unused
const serverData = [
  {
    key: '1',
    name: 'Application Server 1',
    status: 'online',
    uptime: '24d 12h 35m',
    cpu: 38,
    memory: 48,
    region: 'US-East'
  },
  {
    key: '2',
    name: 'Application Server 2',
    status: 'online',
    uptime: '15d 8h 12m',
    cpu: 42,
    memory: 51,
    region: 'US-East'
  },
  {
    key: '3',
    name: 'Database Server',
    status: 'online',
    uptime: '30d 5h 47m',
    cpu: 65,
    memory: 72,
    region: 'US-East'
  },
  {
    key: '4',
    name: 'Cache Server',
    status: 'online',
    uptime: '22d 9h 15m',
    cpu: 25,
    memory: 45,
    region: 'US-West'
  },
  {
    key: '5',
    name: 'Backup Server',
    status: 'maintenance',
    uptime: '2h 24m',
    cpu: 10,
    memory: 22,
    region: 'US-Central'
  }
];
*/

// Server status columns
/* Commented out as unused
const columns = [
  {
    title: 'Server Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <strong>{text}</strong>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      if (status === 'online') {
        return <Badge status="success" text="Online" />;
      } else if (status === 'offline') {
        return <Badge status="error" text="Offline" />;
      } else if (status === 'maintenance') {
        return <Badge status="warning" text="Maintenance" />;
      }
      return <Badge status="default" text={status} />;
    }
  },
  {
    title: 'Uptime',
    dataIndex: 'uptime',
    key: 'uptime',
  },
  {
    title: 'CPU',
    dataIndex: 'cpu',
    key: 'cpu',
    render: (cpu) => (
      <Progress 
        percent={cpu} 
        size="small" 
        status={cpu > 90 ? 'exception' : cpu > 70 ? 'warning' : 'normal'} 
        strokeWidth={6}
      />
    )
  },
  {
    title: 'Memory',
    dataIndex: 'memory',
    key: 'memory',
    render: (memory) => (
      <Progress 
        percent={memory} 
        size="small" 
        status={memory > 90 ? 'exception' : memory > 70 ? 'warning' : 'normal'} 
        strokeWidth={6}
      />
    )
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
  }
];
*/

// Generate realistic historical data for charts
const generateTimeSeriesData = (dataPoints, baseValue, variance, trend = 0) => {
  const now = new Date();
  return [...Array(dataPoints).keys()].map(i => {
    const timestamp = new Date(now - (dataPoints - i) * 60000);
    const random = Math.random() * variance - variance / 2;
    const trendFactor = trend * i / dataPoints;
    const value = Math.max(0, baseValue + random + trendFactor);
    return {
      timestamp: timestamp.toISOString(),
      time: `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`,
      value: parseFloat(value.toFixed(2))
    };
  });
};

// Hardware Performance KPIs
const hardwareKPIs = {
  gpuUtilization: {
    current: 72,
    status: 'normal',
    data: generateTimeSeriesData(24, 70, 20, 5)
  },
  gpuStorageUsed: {
    current: 65,
    status: 'normal',
    data: generateTimeSeriesData(24, 60, 10, 10)
  },
  gpuProcessingSpeed: {
    current: 124,
    unit: 'fps',
    status: 'normal',
    data: generateTimeSeriesData(24, 120, 15, 0)
  },
  gpuTemperature: {
    current: 68,
    unit: '°C',
    status: 'warning',
    threshold: 75,
    data: generateTimeSeriesData(24, 65, 8, 5)
  },
  gpuStatus: {
    current: 'Operational',
    status: 'success'
  },
  networkLatency: {
    current: 28,
    unit: 'ms',
    status: 'normal',
    data: generateTimeSeriesData(24, 30, 10, -3)
  },
  ocrSystemStatus: {
    current: 'Active',
    status: 'success'
  },
  ocrStatusPing: {
    current: 'Responsive',
    status: 'success'
  },
  networkBoxStatus: {
    current: 'Connected',
    status: 'success'
  },
  cpuMemory: {
    current: 58,
    status: 'normal',
    data: generateTimeSeriesData(24, 55, 15, 5)
  },
  networkBoxPing: {
    current: 'Responsive',
    status: 'success'
  },
  networkBoxUptime: {
    current: 99.98,
    unit: '%',
    status: 'success'
  }
};

// Camera and Screen Uptime KPIs
const cameraKPIs = {
  cameraFunctionality: {
    current: 'Operational',
    status: 'success'
  },
  cameraStatus: {
    current: 'Online',
    status: 'success'
  },
  cameraUptime: {
    current: 99.7,
    unit: '%',
    status: 'success',
    data: generateTimeSeriesData(24, 99.5, 0.5, 0)
  },
  screenFunctionality: {
    current: 'Operational',
    status: 'success'
  },
  screenStatus: {
    current: 'Active',
    status: 'success'
  }
};

// Database and Storage KPIs
const databaseKPIs = {
  databasePerformance: {
    current: 'Optimal',
    status: 'success'
  },
  databaseUptime: {
    current: 99.99,
    unit: '%',
    status: 'success',
    data: generateTimeSeriesData(24, 99.95, 0.1, 0)
  },
  backupSuccessRate: {
    current: 100,
    unit: '%',
    status: 'success'
  },
  storageUtilization: {
    current: 68,
    unit: '%',
    status: 'normal',
    data: generateTimeSeriesData(24, 65, 8, 5)
  },
  storageCapacityUsed: {
    current: '1.8',
    unit: 'TB / 3TB',
    status: 'normal'
  },
  backupFrequency: {
    current: 'Daily',
    status: 'success'
  }
};

// System Reliability KPIs
const reliabilityKPIs = {
  overallUptime: {
    current: 99.95,
    unit: '%',
    status: 'success',
    data: generateTimeSeriesData(24, 99.9, 0.15, 0)
  },
  hardwareFailures: {
    current: 0,
    status: 'success',
    lastFailure: '32 days ago'
  }
};

// Status color mapping
const getStatusColor = (status) => {
  switch(status) {
    case 'success': return '#52c41a';
    case 'warning': return '#faad14';
    case 'error': return '#f5222d';
    case 'normal': return '#1890ff';
    default: return '#1890ff';
  }
};

// Status icon mapping
/* Commented out as unused
const getStatusIcon = (status) => {
  switch(status) {
    case 'success': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'warning': return <WarningOutlined style={{ color: '#faad14' }} />;
    case 'error': return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
    case 'normal': return <CheckCircleOutlined style={{ color: '#1890ff' }} />;
    default: return <SyncOutlined style={{ color: '#1890ff' }} spin />;
  }
};
*/

// Create location data for camera uptime
const locationData = [
  { name: 'RM Dock', uptime: 99.8 },
  { name: 'FG Entry', uptime: 99.6 },
  { name: 'Main Gate', uptime: 100 },
  { name: 'Warehouse A', uptime: 99.9 },
  { name: 'Warehouse B', uptime: 99.7 }
];

// KPI Card component for displaying individual metrics
const KpiCard = ({ title, value, unit, status, icon, description }) => {
  return (
    <Card className="system-status-card" bordered={false}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div className="system-status-card-header">
          <Space>
            {icon}
            <Text style={{ fontSize: '14px' }}>{title}</Text>
          </Space>
          {status && (
            <Badge 
              status={status === 'normal' ? 'processing' : status} 
              text={status === 'normal' ? 'Normal' : status.charAt(0).toUpperCase() + status.slice(1)} 
            />
          )}
        </div>
        <div className="system-status-card-value">
          <Statistic 
            value={value} 
            suffix={unit} 
            valueStyle={{ 
              color: getStatusColor(status),
              fontSize: '24px'
            }} 
          />
        </div>
        {description && <Text type="secondary">{description}</Text>}
      </Space>
    </Card>
  );
};

// Chart Card component for displaying time series data
const ChartCard = ({ title, data, dataKey, status, type = 'line', unit = '' }) => {
  return (
    <Card className="system-status-chart-card" bordered={false}>
      <div className="system-status-card-header">
        <Space>
          <AreaChartOutlined />
          <Text style={{ fontSize: '14px' }}>{title}</Text>
        </Space>
        {status && (
          <Badge 
            status={status === 'normal' ? 'processing' : status} 
            text={status === 'normal' ? 'Normal' : status.charAt(0).toUpperCase() + status.slice(1)} 
          />
        )}
      </div>
      <div className="system-status-chart-container">
        <ResponsiveContainer width="100%" height={180}>
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value) => [`${value}${unit}`, dataKey]} 
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getStatusColor(status)} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          ) : type === 'area' ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value) => [`${value}${unit}`, dataKey]} 
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={getStatusColor(status)} 
                fill={getStatusColor(status) + '30'}
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value) => [`${value}${unit}`, dataKey]} 
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Bar 
                dataKey="value" 
                fill={getStatusColor(status)} 
                barSize={8}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Location Uptime Table
const LocationUptimeTable = ({ data }) => {
  const columns = [
    {
      title: 'Location',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Uptime',
      dataIndex: 'uptime',
      key: 'uptime',
      render: (uptime) => (
        <Space>
          <Progress 
            percent={uptime} 
            size="small" 
            status={uptime < 95 ? 'exception' : uptime < 98 ? 'warning' : 'success'} 
            strokeWidth={5}
            format={(percent) => `${percent}%`}
            style={{ width: 150 }}
          />
          <Badge 
            status={uptime < 95 ? 'error' : uptime < 98 ? 'warning' : 'success'} 
          />
        </Space>
      )
    }
  ];

  return (
    <Card className="system-status-card" bordered={false}>
      <div className="system-status-card-header">
        <Space>
          <CameraOutlined />
          <Text style={{ fontSize: '14px' }}>Camera Uptime by Location</Text>
        </Space>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false} 
        size="small"
        rowKey="name"
      />
    </Card>
  );
};

// Main System Status component
const SystemStatus = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [refreshing, setRefreshing] = useState(false);

  // Handle manual refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <div className="system-status-container">
      <div className="dashboard-header">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <Title level={2} className="dashboard-title">System Status</Title>
            <Text type="secondary">Real-time performance metrics and system health</Text>
          </Col>
          <Col>
            <Space>
              <Tag icon={<CheckCircleOutlined />} color="success">
                All Systems Operational
              </Tag>
              <Tag color="default" onClick={handleRefresh} style={{ cursor: 'pointer' }}>
                {refreshing ? <SyncOutlined spin /> : <ReloadOutlined />} Refresh
              </Tag>
            </Space>
          </Col>
        </Row>
      </div>

      <div className="system-status-tabs">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <Space>
              <Text type="secondary">Last updated: {new Date().toLocaleTimeString()}</Text>
            </Space>
          }
        >
          <TabPane 
            tab={
              <span>
                <DashboardOutlined />
                Overview
              </span>
            } 
            key="1"
          >
            <div className="system-status-overview">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Alert
                    message="System Status Update"
                    description="All equipment in system are working. No hardware failures detected in the last 32 days."
                    type="success"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card 
                    title={
                      <Space>
                        <DesktopOutlined />
                        <span>Hardware Performance KPIs</span>
                      </Space>
                    } 
                    bordered={false}
                    className="system-status-section-card"
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="GPU Utilization" 
                          value={hardwareKPIs.gpuUtilization.current} 
                          unit="%" 
                          status={hardwareKPIs.gpuUtilization.status}
                          icon={<DesktopOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="GPU Processing Speed" 
                          value={hardwareKPIs.gpuProcessingSpeed.current} 
                          unit=" fps" 
                          status={hardwareKPIs.gpuProcessingSpeed.status}
                          icon={<DesktopOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="GPU Temperature" 
                          value={hardwareKPIs.gpuTemperature.current} 
                          unit="°C" 
                          status={hardwareKPIs.gpuTemperature.status}
                          icon={<DesktopOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Network Latency" 
                          value={hardwareKPIs.networkLatency.current} 
                          unit=" ms" 
                          status={hardwareKPIs.networkLatency.status}
                          icon={<DesktopOutlined />}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card 
                    title={
                      <Space>
                        <CameraOutlined />
                        <span>Camera and Screen Uptime KPIs</span>
                      </Space>
                    } 
                    bordered={false}
                    className="system-status-section-card"
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Camera Functionality" 
                          value={cameraKPIs.cameraFunctionality.current} 
                          status={cameraKPIs.cameraFunctionality.status}
                          icon={<CameraOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Camera Status" 
                          value={cameraKPIs.cameraStatus.current} 
                          status={cameraKPIs.cameraStatus.status}
                          icon={<CameraOutlined />}
                        />
                      </Col>
                      <Col xs={24}>
                        <LocationUptimeTable data={locationData} />
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card 
                    title={
                      <Space>
                        <DatabaseOutlined />
                        <span>Database and Storage KPIs</span>
                      </Space>
                    } 
                    bordered={false}
                    className="system-status-section-card"
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Database Uptime" 
                          value={databaseKPIs.databaseUptime.current} 
                          unit="%" 
                          status={databaseKPIs.databaseUptime.status}
                          icon={<DatabaseOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Backup Success Rate" 
                          value={databaseKPIs.backupSuccessRate.current} 
                          unit="%" 
                          status={databaseKPIs.backupSuccessRate.status}
                          icon={<DatabaseOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Storage Utilization" 
                          value={databaseKPIs.storageUtilization.current} 
                          unit="%" 
                          status={databaseKPIs.storageUtilization.status}
                          icon={<DatabaseOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Storage Capacity Used" 
                          value={databaseKPIs.storageCapacityUsed.current}
                          unit={` ${databaseKPIs.storageCapacityUsed.unit}`}
                          status={databaseKPIs.storageUtilization.status}
                          icon={<DatabaseOutlined />}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card 
                    title={
                      <Space>
                        <SettingOutlined />
                        <span>System Reliability KPIs</span>
                      </Space>
                    } 
                    bordered={false}
                    className="system-status-section-card"
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Overall System Uptime" 
                          value={reliabilityKPIs.overallUptime.current} 
                          unit="%" 
                          status={reliabilityKPIs.overallUptime.status}
                          icon={<SettingOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <KpiCard 
                          title="Hardware Failures" 
                          value={reliabilityKPIs.hardwareFailures.current} 
                          status={reliabilityKPIs.hardwareFailures.status}
                          icon={<SettingOutlined />}
                          description={`Last failure: ${reliabilityKPIs.hardwareFailures.lastFailure}`}
                        />
                      </Col>
                      <Col xs={24}>
                        <ChartCard 
                          title="System Uptime Trend" 
                          data={reliabilityKPIs.overallUptime.data} 
                          dataKey="Uptime"
                          status="success"
                          type="area"
                          unit="%"
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <DesktopOutlined />
                Hardware Performance
              </span>
            } 
            key="2"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="GPU Utilization Trend" 
                  data={hardwareKPIs.gpuUtilization.data} 
                  dataKey="GPU Utilization"
                  status={hardwareKPIs.gpuUtilization.status}
                  unit="%"
                />
              </Col>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="GPU Processing Speed" 
                  data={hardwareKPIs.gpuProcessingSpeed.data} 
                  dataKey="Processing Speed"
                  status={hardwareKPIs.gpuProcessingSpeed.status}
                  unit=" fps"
                />
              </Col>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="GPU Temperature" 
                  data={hardwareKPIs.gpuTemperature.data} 
                  dataKey="Temperature"
                  status={hardwareKPIs.gpuTemperature.status}
                  unit="°C"
                />
              </Col>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="Network Latency" 
                  data={hardwareKPIs.networkLatency.data} 
                  dataKey="Latency"
                  status={hardwareKPIs.networkLatency.status}
                  unit=" ms"
                />
              </Col>
              <Col xs={24} md={12}>
                <KpiCard 
                  title="OCR System Status" 
                  value={hardwareKPIs.ocrSystemStatus.current} 
                  status={hardwareKPIs.ocrSystemStatus.status}
                  icon={<DesktopOutlined />}
                />
              </Col>
              <Col xs={24} md={12}>
                <KpiCard 
                  title="Network Box Status" 
                  value={hardwareKPIs.networkBoxStatus.current} 
                  status={hardwareKPIs.networkBoxStatus.status}
                  icon={<DesktopOutlined />}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <CameraOutlined />
                Camera and Screen
              </span>
            } 
            key="3"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="Camera Uptime Trend" 
                  data={cameraKPIs.cameraUptime.data} 
                  dataKey="Uptime"
                  status={cameraKPIs.cameraUptime.status}
                  unit="%"
                />
              </Col>
              <Col xs={24} md={12}>
                <LocationUptimeTable data={locationData} />
              </Col>
              <Col xs={24} md={12}>
                <KpiCard 
                  title="Screen Functionality" 
                  value={cameraKPIs.screenFunctionality.current} 
                  status={cameraKPIs.screenFunctionality.status}
                  icon={<CameraOutlined />}
                />
              </Col>
              <Col xs={24} md={12}>
                <KpiCard 
                  title="LED Screen Status" 
                  value={cameraKPIs.screenStatus.current} 
                  status={cameraKPIs.screenStatus.status}
                  icon={<CameraOutlined />}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <DatabaseOutlined />
                Database and Storage
              </span>
            } 
            key="4"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="Database Uptime" 
                  data={databaseKPIs.databaseUptime.data} 
                  dataKey="Uptime"
                  status={databaseKPIs.databaseUptime.status}
                  unit="%"
                />
              </Col>
              <Col xs={24} md={12}>
                <ChartCard 
                  title="Storage Utilization" 
                  data={databaseKPIs.storageUtilization.data} 
                  dataKey="Utilization"
                  status={databaseKPIs.storageUtilization.status}
                  unit="%"
                />
              </Col>
              <Col xs={24} md={12}>
                <KpiCard 
                  title="Backup Success Rate" 
                  value={databaseKPIs.backupSuccessRate.current} 
                  unit="%" 
                  status={databaseKPIs.backupSuccessRate.status}
                  icon={<DatabaseOutlined />}
                />
              </Col>
              <Col xs={24} md={12}>
                <KpiCard 
                  title="Backup Frequency" 
                  value={databaseKPIs.backupFrequency.current} 
                  status={databaseKPIs.backupFrequency.status}
                  icon={<DatabaseOutlined />}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemStatus; 