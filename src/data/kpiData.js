// KPI Data based on the provided metrics
export const kpiData = [
  {
    id: 'tat',
    name: 'Overall Truck Turnaround Time (TAT)',
    level: 'Primary',
    priority: 1,
    granularity: 'per day',
    category: 'TAT by milestone',
    value: 127.5,
    suffix: ' min',
    trend: -5.2,
    status: 'success',
    calculation: 'exitTimestamp-gateInTimestamp',
    description: 'Time taken from truck entry to exit'
  },
  {
    id: 'asset_utilization',
    name: 'Asset Utilization Rate',
    level: 'Primary',
    priority: 2,
    granularity: 'per dock',
    category: 'Efficiency',
    value: 78.4,
    suffix: '%',
    trend: 3.1,
    status: 'success',
    calculation: '(Occupied/Utilized Asset Time/Total Available AssetTime)*100',
    description: 'Percentage of time assets are occupied vs. total available time'
  },
  {
    id: 'doc_compliance',
    name: 'Document Compliance Rate',
    level: 'Primary',
    priority: 3,
    granularity: 'per day',
    category: 'Reason by category',
    value: 92.7,
    suffix: '%',
    trend: 1.8,
    status: 'success',
    calculation: '(Trucks with All Required Documents checks passed/Total Trucks)*100',
    description: 'Percentage of trucks with complete and valid documentation throughout the process'
  },
  {
    id: 'deviation_acceptance',
    name: 'Deviation acceptance Rate',
    level: 'Primary',
    priority: 4,
    granularity: 'per day',
    category: 'Reason by category',
    value: 8.2,
    suffix: '%',
    trend: -2.1,
    status: 'warning',
    calculation: '(Trucks with accepted Violations/Total Trucks)*100',
    description: 'Percentage of accepted trucks with violations recorded (e.g., late arrivals, missing documents)'
  },
  {
    id: 'truck_rejection',
    name: 'Count of Truck Rejection at Gate',
    level: 'Primary',
    priority: 1,
    granularity: 'per day per truck',
    category: 'Reason by category',
    value: 15,
    suffix: '',
    trend: -12.5,
    status: 'success',
    calculation: '(Count of trucks with status = "Rejected")',
    description: 'Number of trucks rejected due to invalid/missing documentation'
  },
  {
    id: 'green_channel',
    name: 'Green Channel Processing Time',
    level: 'Primary',
    priority: 2,
    granularity: 'per day',
    category: 'Time per deviated truck',
    value: 47.2,
    suffix: ' min',
    trend: -8.3,
    status: 'success',
    calculation: 'Σ(gateInTimestamp-numberPlateTimestamp) / Total Green Channel Trucks',
    description: 'Average processing time for Green Channel trucks'
  },
  {
    id: 'non_green_channel',
    name: 'Non-Green channel Processing Time',
    level: 'Primary',
    priority: 3,
    granularity: 'per day',
    category: 'Time per deviated truck',
    value: 92.1,
    suffix: ' min',
    trend: 5.7,
    status: 'warning',
    calculation: 'Σ(gateInTimestamp-numberPlateTimestamp) / Total Non Green Channel Trucks',
    description: 'Average processing time for other (Non Green Channel) trucks'
  },
  {
    id: 'accepted_deviation',
    name: 'Count of Trucks with Accepted Deviation',
    level: 'Primary',
    priority: 4,
    granularity: 'per day',
    category: 'Reason by category',
    value: 23,
    suffix: '',
    trend: -3.8,
    status: 'success',
    calculation: '(Count of trucks with status = "Rejected" but Gate In)',
    description: 'Number of trucks accepted post-deviation'
  },
  {
    id: 'on_time_arrival',
    name: 'On-time arrival of Trucks',
    level: 'Primary',
    priority: 3,
    granularity: 'per day',
    category: 'Punctuality',
    value: 85.3,
    suffix: '%',
    trend: 2.1,
    status: 'success',
    calculation: 'ActualArrivalTime-ExpectedArrivalTime',
    description: 'Percentage of trucks arriving on time'
  },
  {
    id: 'weighbridge',
    name: 'Weighbridge Processing Time for Truck',
    level: 'Primary',
    priority: 1,
    granularity: 'per day',
    category: 'Weighment number & per truck',
    value: 18.5,
    suffix: ' min',
    trend: -12.3,
    status: 'success',
    calculation: 'Σ(weighOutTimestamp-numberPlateTimestamp) / Total Trucks',
    description: 'Average time taken for weighbridge operations (weight recording)'
  },
  {
    id: 'weight_variance',
    name: 'Count of High Weight Variance Check',
    level: 'Primary',
    priority: 2,
    granularity: 'per day',
    category: 'Category wise (Inbound & Outbound)',
    value: 8,
    suffix: '',
    trend: -25.0,
    status: 'success',
    calculation: 'Trucks with weightApprovalFlag = "No"',
    description: 'Number of weight discrepancies between multiple weight checks'
  },
  {
    id: 'dock_processing',
    name: 'Dock Processing Time',
    level: 'Primary',
    priority: 1,
    granularity: 'per day',
    category: 'Time per truck',
    value: 65.7,
    suffix: ' min',
    trend: -3.5,
    status: 'success',
    calculation: 'Σ(undockingTimestamp-dockingTimestamp)/Total Trucks',
    description: 'Total Dock TAT'
  },
  {
    id: 'loading_unloading',
    name: 'Loading/Unloading time',
    level: 'Support',
    priority: 3,
    granularity: 'per day',
    category: 'Time per truck',
    value: 42.3,
    suffix: ' min',
    trend: -5.2,
    status: 'success',
    calculation: 'Total loading/unloading duration',
    description: 'Time spent on loading/unloading operations'
  },
  {
    id: 'rejected_loading',
    name: 'Count of Trucks Rejected due to Loading Checksheet failure',
    level: 'Primary',
    priority: 2,
    granularity: 'per day',
    category: 'Reason by category',
    value: 5,
    suffix: '',
    trend: -28.6,
    status: 'success',
    calculation: 'Trucks with loadingChecksheet = "No"',
    description: 'Number of trucks with correct material documentation at the dock'
  },
  {
    id: 'exit_processing',
    name: 'Exit Processing Time',
    level: 'Primary',
    priority: 1,
    granularity: 'per day',
    category: 'Time per deviated truck',
    value: 12.8,
    suffix: ' min',
    trend: -8.6,
    status: 'success',
    calculation: '(exitTimestamp-numberPlateTimestamp)',
    description: 'Time taken to exit gate'
  }
];

// Grouped categories for the dashboard
export const kpiCategories = [
  {
    id: 'turnaround',
    name: 'Turnaround Time',
    description: 'Metrics related to overall processing time',
    kpis: ['tat', 'green_channel', 'non_green_channel', 'dock_processing', 'exit_processing']
  },
  {
    id: 'compliance',
    name: 'Documentation & Compliance',
    description: 'Metrics related to document validation and compliance',
    kpis: ['doc_compliance', 'deviation_acceptance', 'truck_rejection', 'accepted_deviation']
  },
  {
    id: 'operations',
    name: 'Operational Efficiency',
    description: 'Metrics related to operational performance',
    kpis: ['asset_utilization', 'weighbridge', 'weight_variance', 'loading_unloading', 'rejected_loading', 'on_time_arrival']
  }
];

// Time series data for charts (realistic data)
export const kpiTrendData = {
  tat: [
    { date: '2023-05-01', value: 135.2 },
    { date: '2023-05-02', value: 142.1 },
    { date: '2023-05-03', value: 138.7 },
    { date: '2023-05-04', value: 131.5 },
    { date: '2023-05-05', value: 129.8 },
    { date: '2023-05-06', value: 127.5 },
  ],
  doc_compliance: [
    { date: '2023-05-01', value: 89.2 },
    { date: '2023-05-02', value: 90.5 },
    { date: '2023-05-03', value: 91.1 },
    { date: '2023-05-04', value: 91.9 },
    { date: '2023-05-05', value: 92.3 },
    { date: '2023-05-06', value: 92.7 },
  ],
  green_channel: [
    { date: '2023-05-01', value: 54.1 },
    { date: '2023-05-02', value: 52.8 },
    { date: '2023-05-03', value: 51.2 },
    { date: '2023-05-04', value: 50.1 },
    { date: '2023-05-05', value: 48.5 },
    { date: '2023-05-06', value: 47.2 },
  ],
  non_green_channel: [
    { date: '2023-05-01', value: 87.3 },
    { date: '2023-05-02', value: 88.1 },
    { date: '2023-05-03', value: 88.9 },
    { date: '2023-05-04', value: 90.2 },
    { date: '2023-05-05', value: 91.4 },
    { date: '2023-05-06', value: 92.1 },
  ],
  truck_rejection: [
    { date: '2023-05-01', value: 18 },
    { date: '2023-05-02', value: 17 },
    { date: '2023-05-03', value: 19 },
    { date: '2023-05-04', value: 16 },
    { date: '2023-05-05', value: 14 },
    { date: '2023-05-06', value: 15 },
  ],
  dock_processing: [
    { date: '2023-05-01', value: 70.2 },
    { date: '2023-05-02', value: 69.1 },
    { date: '2023-05-03', value: 68.4 },
    { date: '2023-05-04', value: 67.8 },
    { date: '2023-05-05', value: 66.5 },
    { date: '2023-05-06', value: 65.7 },
  ]
}; 