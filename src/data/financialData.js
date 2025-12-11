// Mock financial data for TMHNA Financial Intelligence Dashboard
// Simulates data from unified financial data model (Snowflake + S/4HANA)

export const fiscalYears = [2023, 2024]
export const brands = ['All', 'TMH', 'Raymond', 'THD']
export const regions = ['All', 'North America', 'EMEA', 'APAC']

// KPI Data by fiscal year
export const kpiData = {
  2023: {
    totalRevenue: { value: 6.8, change: 4.2, unit: 'B' },
    operatingMargin: { value: 13.6, change: 0.8, unit: '%' },
    backlog: { value: 1.4, change: 2.1, unit: 'B' },
    daysSalesOutstanding: { value: 50, change: 2, unit: 'days' },
  },
  2024: {
    totalRevenue: { value: 7.2, change: 5.4, unit: 'B' },
    operatingMargin: { value: 14.8, change: 1.2, unit: '%' },
    backlog: { value: 1.3, change: -3.1, unit: 'B' },
    daysSalesOutstanding: { value: 46, change: -4, unit: 'days' },
  },
}

// Revenue by brand (in billions) - Enhanced with region breakdown
export const revenueByBrand = {
  2023: {
    All: { TMH: 3.2, Raymond: 2.1, THD: 1.5 },
    TMH: { TMH: 3.2 },
    Raymond: { Raymond: 2.1 },
    THD: { THD: 1.5 },
    'North America': { TMH: 1.8, Raymond: 1.2, THD: 0.9 },
    EMEA: { TMH: 0.9, Raymond: 0.6, THD: 0.4 },
    APAC: { TMH: 0.5, Raymond: 0.3, THD: 0.2 },
  },
  2024: {
    All: { TMH: 3.5, Raymond: 2.3, THD: 1.4 },
    TMH: { TMH: 3.5 },
    Raymond: { Raymond: 2.3 },
    THD: { THD: 1.4 },
    'North America': { TMH: 2.0, Raymond: 1.3, THD: 1.0 },
    EMEA: { TMH: 1.0, Raymond: 0.7, THD: 0.3 },
    APAC: { TMH: 0.5, Raymond: 0.3, THD: 0.1 },
  },
}

// Helper to get revenue by brand based on filters
export function getRevenueByBrand(year, brand, region) {
  if (region !== 'All' && revenueByBrand[year][region]) {
    if (brand === 'All') {
      return revenueByBrand[year][region]
    }
    return { [brand]: revenueByBrand[year][region][brand] || 0 }
  }
  if (brand !== 'All') {
    return { [brand]: revenueByBrand[year][brand][brand] || 0 }
  }
  return revenueByBrand[year].All
}

// Operating margin trend (monthly data for selected year)
export const operatingMarginTrend = {
  2023: [
    { month: 'Jan', margin: 12.8 },
    { month: 'Feb', margin: 13.1 },
    { month: 'Mar', margin: 13.5 },
    { month: 'Apr', margin: 13.2 },
    { month: 'May', margin: 13.8 },
    { month: 'Jun', margin: 14.0 },
    { month: 'Jul', margin: 13.6 },
    { month: 'Aug', margin: 13.9 },
    { month: 'Sep', margin: 13.7 },
    { month: 'Oct', margin: 13.5 },
    { month: 'Nov', margin: 13.4 },
    { month: 'Dec', margin: 13.6 },
  ],
  2024: [
    { month: 'Jan', margin: 14.2 },
    { month: 'Feb', margin: 14.5 },
    { month: 'Mar', margin: 14.8 },
    { month: 'Apr', margin: 15.1 },
    { month: 'May', margin: 14.9 },
    { month: 'Jun', margin: 15.0 },
    { month: 'Jul', margin: 14.7 },
    { month: 'Aug', margin: 14.8 },
    { month: 'Sep', margin: 14.6 },
    { month: 'Oct', margin: 14.5 },
    { month: 'Nov', margin: 14.7 },
    { month: 'Dec', margin: 14.8 },
  ],
}

// Detailed financial metrics by dealer/region
export const detailedMetrics = [
  {
    brand: 'TMH',
    dealer: 'Lift Systems Inc.',
    region: 'North America',
    revenue: 245.8,
    grossMargin: 28.5,
    operatingMargin: 16.2,
    backlog: 42.3,
  },
  {
    brand: 'Raymond',
    dealer: 'Warehouse Solutions LLC',
    region: 'North America',
    revenue: 189.4,
    grossMargin: 32.1,
    operatingMargin: 18.5,
    backlog: 38.7,
  },
  {
    brand: 'THD',
    dealer: 'Heavy Equipment Co.',
    region: 'North America',
    revenue: 156.2,
    grossMargin: 24.8,
    operatingMargin: 14.3,
    backlog: 29.5,
  },
  {
    brand: 'TMH',
    dealer: 'European Material Handling',
    region: 'EMEA',
    revenue: 198.7,
    grossMargin: 27.2,
    operatingMargin: 15.8,
    backlog: 35.4,
  },
  {
    brand: 'Raymond',
    dealer: 'EMEA Distribution Partners',
    region: 'EMEA',
    revenue: 167.3,
    grossMargin: 30.5,
    operatingMargin: 17.2,
    backlog: 31.2,
  },
  {
    brand: 'THD',
    dealer: 'Heavy Duty Europe',
    region: 'EMEA',
    revenue: 124.6,
    grossMargin: 23.4,
    operatingMargin: 13.1,
    backlog: 22.8,
  },
  {
    brand: 'TMH',
    dealer: 'Asia Pacific Materials',
    region: 'APAC',
    revenue: 178.9,
    grossMargin: 26.8,
    operatingMargin: 15.4,
    backlog: 33.1,
  },
  {
    brand: 'Raymond',
    dealer: 'APAC Warehouse Systems',
    region: 'APAC',
    revenue: 145.2,
    grossMargin: 29.7,
    operatingMargin: 16.8,
    backlog: 28.4,
  },
  {
    brand: 'THD',
    dealer: 'Heavy Equipment Asia',
    region: 'APAC',
    revenue: 112.5,
    grossMargin: 22.9,
    operatingMargin: 12.6,
    backlog: 19.7,
  },
  {
    brand: 'TMH',
    dealer: 'North American Lift Corp',
    region: 'North America',
    revenue: 223.1,
    grossMargin: 27.9,
    operatingMargin: 15.9,
    backlog: 39.8,
  },
  {
    brand: 'Raymond',
    dealer: 'Material Handling Solutions',
    region: 'North America',
    revenue: 201.6,
    grossMargin: 31.4,
    operatingMargin: 19.1,
    backlog: 41.2,
  },
  {
    brand: 'THD',
    dealer: 'Industrial Equipment Group',
    region: 'North America',
    revenue: 168.9,
    grossMargin: 25.2,
    operatingMargin: 14.7,
    backlog: 32.1,
  },
]

// Helper function to filter data based on selections
export function getFilteredData(year, brand, region) {
  let filtered = [...detailedMetrics]

  if (brand !== 'All') {
    filtered = filtered.filter((item) => item.brand === brand)
  }

  if (region !== 'All') {
    filtered = filtered.filter((item) => item.region === region)
  }

  return filtered
}

// Get aggregated KPIs based on filters
export function getFilteredKPIs(year, brand, region) {
  const filtered = getFilteredData(year, brand, region)
  
  const totalRevenue = filtered.reduce((sum, item) => sum + item.revenue, 0) / 1000 // Convert to billions
  const avgOperatingMargin = filtered.length > 0 
    ? filtered.reduce((sum, item) => sum + item.operatingMargin, 0) / filtered.length 
    : 0
  const totalBacklog = filtered.reduce((sum, item) => sum + item.backlog, 0) / 1000 // Convert to billions
  
  // Calculate changes (simplified - in real app would compare to prior period)
  const baseKPIs = kpiData[year]
  const revenueChange = brand === 'All' && region === 'All' 
    ? baseKPIs.totalRevenue.change 
    : (totalRevenue > 0 ? 2.5 : -1.2) // Simplified change calculation
  const marginChange = brand === 'All' && region === 'All'
    ? baseKPIs.operatingMargin.change
    : (avgOperatingMargin > 14 ? 0.8 : -0.3)
  
  return {
    totalRevenue: { value: totalRevenue, change: revenueChange, unit: 'B' },
    operatingMargin: { value: avgOperatingMargin, change: marginChange, unit: '%' },
    backlog: { value: totalBacklog, change: baseKPIs.backlog.change, unit: 'B' },
    daysSalesOutstanding: baseKPIs.daysSalesOutstanding,
  }
}

// Get revenue distribution for pie chart
export function getRevenueDistribution(year, brand, region) {
  const revenueData = getRevenueByBrand(year, brand, region)
  return Object.entries(revenueData).map(([name, value]) => ({
    name,
    value,
  }))
}

