// Helper functions for KPI data processing

/**
 * Gets KPI data by ID
 * @param {Array} kpiData - The array of KPI data
 * @param {string} id - The KPI ID to find
 * @returns {Object|null} - The KPI object or null if not found
 */
export const getKpiById = (kpiData, id) => {
  return kpiData.find(kpi => kpi.id === id) || null;
};

/**
 * Gets KPIs by category ID
 * @param {Array} kpiData - The array of KPI data
 * @param {Array} categories - The array of category data
 * @param {string} categoryId - The category ID to filter by
 * @returns {Array} - The filtered KPI data
 */
export const getKpisByCategory = (kpiData, categories, categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return kpiData.filter(kpi => category.kpis.includes(kpi.id));
};

/**
 * Groups KPIs by level (Primary, Support)
 * @param {Array} kpiData - The array of KPI data
 * @returns {Object} - Object with keys for each level and arrays of KPIs
 */
export const groupKpisByLevel = (kpiData) => {
  return kpiData.reduce((acc, kpi) => {
    if (!acc[kpi.level]) {
      acc[kpi.level] = [];
    }
    acc[kpi.level].push(kpi);
    return acc;
  }, {});
};

/**
 * Filters KPIs by priority
 * @param {Array} kpiData - The array of KPI data
 * @param {number} priority - The priority level to filter by
 * @returns {Array} - The filtered KPI data
 */
export const getKpisByPriority = (kpiData, priority) => {
  return kpiData.filter(kpi => kpi.priority === priority);
};

/**
 * Gets the top N KPIs by a specific criteria
 * @param {Array} kpiData - The array of KPI data
 * @param {string} sortKey - The key to sort by
 * @param {boolean} ascending - Whether to sort in ascending order
 * @param {number} limit - The number of KPIs to return
 * @returns {Array} - The top N KPIs
 */
export const getTopKpis = (kpiData, sortKey = 'value', ascending = false, limit = 5) => {
  const sortedData = [...kpiData].sort((a, b) => {
    if (ascending) {
      return a[sortKey] - b[sortKey];
    } else {
      return b[sortKey] - a[sortKey];
    }
  });
  
  return sortedData.slice(0, limit);
};

/**
 * Calculates the average value for a set of KPIs
 * @param {Array} kpiData - The array of KPI data
 * @param {Array} kpiIds - Array of KPI IDs to average
 * @returns {number} - The average value
 */
export const calculateAverageKpiValue = (kpiData, kpiIds) => {
  const filteredKpis = kpiData.filter(kpi => kpiIds.includes(kpi.id));
  if (filteredKpis.length === 0) return 0;
  
  const sum = filteredKpis.reduce((total, kpi) => total + kpi.value, 0);
  return sum / filteredKpis.length;
}; 