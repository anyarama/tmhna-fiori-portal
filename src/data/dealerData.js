// Mock dealer data for TMHNA Dealer Analytics Dashboard

export const dealerTiers = ['All Tiers', 'Strategic', 'Core', 'Emerging']
export const dealerRegions = ['All Regions', 'North America', 'EMEA', 'APAC']
export const dealerBrands = ['All Brands', 'TMH', 'Raymond', 'THD']

// Dealer records with performance metrics
// Shaped for expressive charts: scatter plot spread, distinct margin trends, regional variation
export const dealerRecords = [
  // High revenue / High margin (top-right quadrant) - Strategic dealers
  {
    id: 'D1001',
    name: 'Lift Systems Inc.',
    brand: 'TMH',
    region: 'North America',
    tier: 'Strategic',
    revenueUSD: 258.4,
    marginPct: 17.8,
    backlogUSD: 42.3,
    backlogRisk: 'Low',
    dsoDays: 38,
    marginTrend: [
      { quarter: 'Q1', marginPct: 16.2 },
      { quarter: 'Q2', marginPct: 16.8 },
      { quarter: 'Q3', marginPct: 17.3 },
      { quarter: 'Q4', marginPct: 17.8 },
    ],
  },
  {
    id: 'D2001',
    name: 'Material Handling Solutions',
    brand: 'Raymond',
    region: 'North America',
    tier: 'Strategic',
    revenueUSD: 245.6,
    marginPct: 19.2,
    backlogUSD: 31.2,
    backlogRisk: 'Low',
    dsoDays: 35,
    marginTrend: [
      { quarter: 'Q1', marginPct: 18.5 },
      { quarter: 'Q2', marginPct: 18.8 },
      { quarter: 'Q3', marginPct: 19.0 },
      { quarter: 'Q4', marginPct: 19.2 },
    ],
  },
  {
    id: 'D1002',
    name: 'North American Lift Corp',
    brand: 'TMH',
    region: 'North America',
    tier: 'Strategic',
    revenueUSD: 232.7,
    marginPct: 16.4,
    backlogUSD: 48.5,
    backlogRisk: 'Low',
    dsoDays: 41,
    marginTrend: [
      { quarter: 'Q1', marginPct: 15.8 },
      { quarter: 'Q2', marginPct: 16.0 },
      { quarter: 'Q3', marginPct: 16.2 },
      { quarter: 'Q4', marginPct: 16.4 },
    ],
  },
  // High revenue / Medium margin (top-center)
  {
    id: 'D1003',
    name: 'European Material Handling',
    brand: 'TMH',
    region: 'EMEA',
    tier: 'Core',
    revenueUSD: 198.7,
    marginPct: 14.5,
    backlogUSD: 52.8,
    backlogRisk: 'Medium',
    dsoDays: 48,
    marginTrend: [
      { quarter: 'Q1', marginPct: 15.2 },
      { quarter: 'Q2', marginPct: 14.9 },
      { quarter: 'Q3', marginPct: 14.7 },
      { quarter: 'Q4', marginPct: 14.5 },
    ],
  },
  {
    id: 'D2002',
    name: 'Warehouse Solutions LLC',
    brand: 'Raymond',
    region: 'North America',
    tier: 'Core',
    revenueUSD: 189.4,
    marginPct: 18.1,
    backlogUSD: 35.2,
    backlogRisk: 'Low',
    dsoDays: 39,
    marginTrend: [
      { quarter: 'Q1', marginPct: 17.5 },
      { quarter: 'Q2', marginPct: 17.8 },
      { quarter: 'Q3', marginPct: 18.0 },
      { quarter: 'Q4', marginPct: 18.1 },
    ],
  },
  // High revenue / Low margin (top-left) - At risk
  {
    id: 'D3001',
    name: 'Heavy Duty Equipment Co',
    brand: 'THD',
    region: 'North America',
    tier: 'Core',
    revenueUSD: 175.3,
    marginPct: 11.2,
    backlogUSD: 68.4,
    backlogRisk: 'High',
    dsoDays: 54,
    marginTrend: [
      { quarter: 'Q1', marginPct: 12.8 },
      { quarter: 'Q2', marginPct: 12.2 },
      { quarter: 'Q3', marginPct: 11.6 },
      { quarter: 'Q4', marginPct: 11.2 },
    ],
  },
  // Medium revenue / High margin
  {
    id: 'D2003',
    name: 'European Warehouse Systems',
    brand: 'Raymond',
    region: 'EMEA',
    tier: 'Core',
    revenueUSD: 148.5,
    marginPct: 18.3,
    backlogUSD: 28.9,
    backlogRisk: 'Low',
    dsoDays: 42,
    marginTrend: [
      { quarter: 'Q1', marginPct: 17.8 },
      { quarter: 'Q2', marginPct: 18.0 },
      { quarter: 'Q3', marginPct: 18.2 },
      { quarter: 'Q4', marginPct: 18.3 },
    ],
  },
  // Medium revenue / Medium margin
  {
    id: 'D1004',
    name: 'Pacific Lift Systems',
    brand: 'TMH',
    region: 'APAC',
    tier: 'Core',
    revenueUSD: 142.8,
    marginPct: 13.8,
    backlogUSD: 38.6,
    backlogRisk: 'Medium',
    dsoDays: 44,
    marginTrend: [
      { quarter: 'Q1', marginPct: 13.5 },
      { quarter: 'Q2', marginPct: 13.6 },
      { quarter: 'Q3', marginPct: 13.7 },
      { quarter: 'Q4', marginPct: 13.8 },
    ],
  },
  // Medium revenue / Low margin - At risk
  {
    id: 'D3002',
    name: 'Industrial Equipment Group',
    brand: 'THD',
    region: 'EMEA',
    tier: 'Emerging',
    revenueUSD: 135.7,
    marginPct: 9.8,
    backlogUSD: 72.2,
    backlogRisk: 'High',
    dsoDays: 58,
    marginTrend: [
      { quarter: 'Q1', marginPct: 11.2 },
      { quarter: 'Q2', marginPct: 10.5 },
      { quarter: 'Q3', marginPct: 10.1 },
      { quarter: 'Q4', marginPct: 9.8 },
    ],
  },
  {
    id: 'D1005',
    name: 'Midwest Material Handling',
    brand: 'TMH',
    region: 'North America',
    tier: 'Core',
    revenueUSD: 128.9,
    marginPct: 12.1,
    backlogUSD: 55.7,
    backlogRisk: 'High',
    dsoDays: 51,
    marginTrend: [
      { quarter: 'Q1', marginPct: 13.5 },
      { quarter: 'Q2', marginPct: 13.0 },
      { quarter: 'Q3', marginPct: 12.5 },
      { quarter: 'Q4', marginPct: 12.1 },
    ],
  },
  // Medium revenue / High margin
  {
    id: 'D2004',
    name: 'Asia Pacific Material Handling',
    brand: 'Raymond',
    region: 'APAC',
    tier: 'Emerging',
    revenueUSD: 122.4,
    marginPct: 17.2,
    backlogUSD: 24.8,
    backlogRisk: 'Low',
    dsoDays: 36,
    marginTrend: [
      { quarter: 'Q1', marginPct: 16.5 },
      { quarter: 'Q2', marginPct: 16.8 },
      { quarter: 'Q3', marginPct: 17.0 },
      { quarter: 'Q4', marginPct: 17.2 },
    ],
  },
  // Low revenue / Low margin - At risk
  {
    id: 'D3003',
    name: 'Heavy Machinery Distributors',
    brand: 'THD',
    region: 'North America',
    tier: 'Emerging',
    revenueUSD: 98.6,
    marginPct: 8.5,
    backlogUSD: 78.3,
    backlogRisk: 'High',
    dsoDays: 62,
    marginTrend: [
      { quarter: 'Q1', marginPct: 10.2 },
      { quarter: 'Q2', marginPct: 9.5 },
      { quarter: 'Q3', marginPct: 9.0 },
      { quarter: 'Q4', marginPct: 8.5 },
    ],
  },
  {
    id: 'D1006',
    name: 'Atlantic Lift Solutions',
    brand: 'TMH',
    region: 'North America',
    tier: 'Core',
    revenueUSD: 95.2,
    marginPct: 11.8,
    backlogUSD: 48.5,
    backlogRisk: 'Medium',
    dsoDays: 47,
    marginTrend: [
      { quarter: 'Q1', marginPct: 12.2 },
      { quarter: 'Q2', marginPct: 12.0 },
      { quarter: 'Q3', marginPct: 11.9 },
      { quarter: 'Q4', marginPct: 11.8 },
    ],
  },
  {
    id: 'D2005',
    name: 'Nordic Warehouse Equipment',
    brand: 'Raymond',
    region: 'EMEA',
    tier: 'Core',
    revenueUSD: 89.3,
    marginPct: 16.8,
    backlogUSD: 22.1,
    backlogRisk: 'Low',
    dsoDays: 40,
    marginTrend: [
      { quarter: 'Q1', marginPct: 16.5 },
      { quarter: 'Q2', marginPct: 16.6 },
      { quarter: 'Q3', marginPct: 16.7 },
      { quarter: 'Q4', marginPct: 16.8 },
    ],
  },
  // Low revenue / Very low margin - High risk
  {
    id: 'D3004',
    name: 'Pacific Heavy Equipment',
    brand: 'THD',
    region: 'APAC',
    tier: 'Emerging',
    revenueUSD: 76.4,
    marginPct: 8.2,
    backlogUSD: 65.1,
    backlogRisk: 'High',
    dsoDays: 64,
    marginTrend: [
      { quarter: 'Q1', marginPct: 9.8 },
      { quarter: 'Q2', marginPct: 9.2 },
      { quarter: 'Q3', marginPct: 8.7 },
      { quarter: 'Q4', marginPct: 8.2 },
    ],
  },
  {
    id: 'D1007',
    name: 'Gulf Coast Material Handling',
    brand: 'TMH',
    region: 'North America',
    tier: 'Emerging',
    revenueUSD: 72.1,
    marginPct: 10.5,
    backlogUSD: 45.8,
    backlogRisk: 'Medium',
    dsoDays: 49,
    marginTrend: [
      { quarter: 'Q1', marginPct: 11.2 },
      { quarter: 'Q2', marginPct: 10.9 },
      { quarter: 'Q3', marginPct: 10.7 },
      { quarter: 'Q4', marginPct: 10.5 },
    ],
  },
  {
    id: 'D2006',
    name: 'Mediterranean Lift Systems',
    brand: 'Raymond',
    region: 'EMEA',
    tier: 'Emerging',
    revenueUSD: 68.5,
    marginPct: 15.2,
    backlogUSD: 20.4,
    backlogRisk: 'Low',
    dsoDays: 37,
    marginTrend: [
      { quarter: 'Q1', marginPct: 14.8 },
      { quarter: 'Q2', marginPct: 15.0 },
      { quarter: 'Q3', marginPct: 15.1 },
      { quarter: 'Q4', marginPct: 15.2 },
    ],
  },
  // Very low revenue / Very low margin - Critical risk
  {
    id: 'D3005',
    name: 'Continental Heavy Duty',
    brand: 'THD',
    region: 'North America',
    tier: 'Emerging',
    revenueUSD: 58.2,
    marginPct: 8.1,
    backlogUSD: 72.7,
    backlogRisk: 'High',
    dsoDays: 68,
    marginTrend: [
      { quarter: 'Q1', marginPct: 9.5 },
      { quarter: 'Q2', marginPct: 9.0 },
      { quarter: 'Q3', marginPct: 8.5 },
      { quarter: 'Q4', marginPct: 8.1 },
    ],
  },
  // Additional dealers for better scatter spread
  {
    id: 'D1008',
    name: 'Great Lakes Material Handling',
    brand: 'TMH',
    region: 'North America',
    tier: 'Core',
    revenueUSD: 165.8,
    marginPct: 15.6,
    backlogUSD: 41.2,
    backlogRisk: 'Low',
    dsoDays: 40,
    marginTrend: [
      { quarter: 'Q1', marginPct: 14.8 },
      { quarter: 'Q2', marginPct: 15.1 },
      { quarter: 'Q3', marginPct: 15.4 },
      { quarter: 'Q4', marginPct: 15.6 },
    ],
  },
  {
    id: 'D2007',
    name: 'Scandinavian Warehouse Solutions',
    brand: 'Raymond',
    region: 'EMEA',
    tier: 'Core',
    revenueUSD: 112.3,
    marginPct: 17.9,
    backlogUSD: 26.5,
    backlogRisk: 'Low',
    dsoDays: 38,
    marginTrend: [
      { quarter: 'Q1', marginPct: 17.2 },
      { quarter: 'Q2', marginPct: 17.5 },
      { quarter: 'Q3', marginPct: 17.7 },
      { quarter: 'Q4', marginPct: 17.9 },
    ],
  },
  {
    id: 'D3006',
    name: 'Southeast Heavy Equipment',
    brand: 'THD',
    region: 'North America',
    tier: 'Emerging',
    revenueUSD: 82.4,
    marginPct: 9.5,
    backlogUSD: 58.9,
    backlogRisk: 'High',
    dsoDays: 59,
    marginTrend: [
      { quarter: 'Q1', marginPct: 10.8 },
      { quarter: 'Q2', marginPct: 10.2 },
      { quarter: 'Q3', marginPct: 9.8 },
      { quarter: 'Q4', marginPct: 9.5 },
    ],
  },
]

// Helper functions to filter and aggregate dealer data
export function getFilteredDealers(filters) {
  const { year, brand, region, tier } = filters
  return dealerRecords.filter((dealer) => {
    if (brand !== 'All Brands' && dealer.brand !== brand) return false
    if (region !== 'All Regions' && dealer.region !== region) return false
    if (tier !== 'All Tiers' && dealer.tier !== tier) return false
    return true
  })
}

export function getDealerKPIs(filteredDealers) {
  const totalRevenue = filteredDealers.reduce((sum, d) => sum + d.revenueUSD, 0) / 1000 // Convert to billions
  const avgMargin = filteredDealers.reduce((sum, d) => sum + d.marginPct, 0) / filteredDealers.length
  const atRiskCount = filteredDealers.filter(
    (d) => d.backlogRisk === 'High' || (d.marginPct < 12 && d.dsoDays > 45)
  ).length
  const avgDSO = filteredDealers.reduce((sum, d) => sum + d.dsoDays, 0) / filteredDealers.length

  return {
    totalRevenue,
    avgMargin,
    atRiskCount,
    avgDSO,
  }
}

export function getBacklogDSOByRegion(filteredDealers) {
  const regionMap = new Map()
  filteredDealers.forEach((dealer) => {
    if (!regionMap.has(dealer.region)) {
      regionMap.set(dealer.region, { backlogUSD: 0, dsoDays: 0, count: 0 })
    }
    const data = regionMap.get(dealer.region)
    data.backlogUSD += dealer.backlogUSD
    data.dsoDays += dealer.dsoDays
    data.count += 1
  })

  return Array.from(regionMap.entries()).map(([region, data]) => ({
    region,
    backlogUSD: Math.round(data.backlogUSD),
    dsoDays: Math.round(data.dsoDays / data.count),
  }))
}

export function getTopDealersForTrend(filteredDealers, count = 3) {
  return [...filteredDealers]
    .sort((a, b) => b.revenueUSD - a.revenueUSD)
    .slice(0, count)
}

export function getAtRiskDealers(filteredDealers) {
  return filteredDealers
    .filter((d) => d.backlogRisk === 'High' || (d.marginPct < 12 && d.dsoDays > 45))
    .sort((a, b) => {
      // Sort by risk: High backlog risk first, then by margin
      if (a.backlogRisk === 'High' && b.backlogRisk !== 'High') return -1
      if (a.backlogRisk !== 'High' && b.backlogRisk === 'High') return 1
      return a.marginPct - b.marginPct
    })
}
