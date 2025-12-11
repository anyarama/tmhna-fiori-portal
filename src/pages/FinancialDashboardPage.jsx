import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts'
import {
  fiscalYears,
  brands,
  regions,
  kpiData,
  revenueByBrand,
  operatingMarginTrend,
  getFilteredData,
} from '../data/financialData.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { FilterBar } from '../components/FilterBar.jsx'
import { KpiCard } from '../components/KpiCard.jsx'
import { ChartCard } from '../components/ChartCard.jsx'
import { DataTable } from '../components/DataTable.jsx'
import { compactTooltip } from '../lib/charts.js'

export default function FinancialDashboardPage() {
  const [selectedYear, setSelectedYear] = useState(Math.max(...fiscalYears))
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')

  const currentKpis = useMemo(() => kpiData[selectedYear], [selectedYear])

  const brandRevenue = useMemo(() => {
    const yearData = revenueByBrand[selectedYear]
    if (!yearData) return []

    const brandKey = selectedBrand === 'All' ? 'All' : selectedBrand
    const base = yearData[brandKey] || yearData.All || {}

    return Object.entries(base).map(([brandName, value]) => ({
      brand: brandName,
      revenue: value,
    }))
  }, [selectedYear, selectedBrand])

  // Convert monthly margin data to quarterly for display
  const marginTrend = useMemo(() => {
    const yearData = operatingMarginTrend[selectedYear]
    if (!yearData || !Array.isArray(yearData)) return []
    
    // Group months into quarters (average the margin for each quarter)
    const quarters = [
      { quarter: 'Q1', margin: 0 },
      { quarter: 'Q2', margin: 0 },
      { quarter: 'Q3', margin: 0 },
      { quarter: 'Q4', margin: 0 },
    ]
    
    yearData.forEach((monthData, index) => {
      const quarterIndex = Math.floor(index / 3)
      if (quarterIndex < 4 && monthData && typeof monthData.margin === 'number') {
        // Use the last month's margin value for each quarter (or average if preferred)
        quarters[quarterIndex].margin = monthData.margin
      }
    })
    
    return quarters
  }, [selectedYear])

  const filteredMetrics = useMemo(
    () => getFilteredData(selectedYear, selectedBrand, selectedRegion),
    [selectedYear, selectedBrand, selectedRegion]
  )

  // Transform filteredMetrics to match expected table structure
  const tableRows = useMemo(() => {
    return filteredMetrics.map((metric, index) => ({
      dealerId: `D${1000 + index}`,
      dealerName: metric.dealer,
      brand: metric.brand,
      region: metric.region,
      revenue: metric.revenue,
      operatingMargin: metric.operatingMargin,
      backlog: metric.backlog,
      backlogRisk: metric.backlog > 40 ? 'High' : metric.backlog > 30 ? 'Medium' : 'Low',
    }))
  }, [filteredMetrics])

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Financial Intelligence Dashboard"
        subtitle="Unified TMHNA view across TMH, Raymond, and Toyota Heavy Duty"
      />

      <FilterBar
        yearOptions={fiscalYears}
        brandOptions={brands}
        regionOptions={regions}
        selectedYear={selectedYear}
        selectedBrand={selectedBrand}
        selectedRegion={selectedRegion}
        onYearChange={setSelectedYear}
        onBrandChange={setSelectedBrand}
        onRegionChange={setSelectedRegion}
      />

      <div className="kpi-grid">
        <KpiCard
          label="Total Revenue (YTD)"
          value={currentKpis.totalRevenue.value}
          unit={currentKpis.totalRevenue.unit}
          change={currentKpis.totalRevenue.change}
          changeLabel="vs prior year"
          helper="Across TMH, Raymond, and THD"
        />
        <KpiCard
          label="Operating Margin (YTD)"
          value={currentKpis.operatingMargin.value}
          unit={currentKpis.operatingMargin.unit}
          change={currentKpis.operatingMargin.change}
          changeLabel="vs prior year"
          helper="Blended margin across all brands"
        />
        <KpiCard
          label="Backlog"
          value={currentKpis.backlog.value}
          unit={currentKpis.backlog.unit}
          change={currentKpis.backlog.change}
          changeLabel="impact on lead times"
          helper="Open orders still to be fulfilled; key driver of lead times"
        />
        <KpiCard
          label="Days Sales Outstanding"
          value={currentKpis.daysSalesOutstanding.value}
          unit={currentKpis.daysSalesOutstanding.unit}
          change={currentKpis.daysSalesOutstanding.change}
          changeLabel="cash collection efficiency"
          helper="Cash collection efficiency (lower is better)"
        />
      </div>

      <div className="chart-grid">
        <ChartCard
          title="Revenue by Brand"
          subtitle={`Unified brand view – TMH, Raymond, THD (Fiscal Year ${selectedYear})`}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={brandRevenue} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border-subtle)" />
              <XAxis 
                dataKey="brand" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `$${(value / 1000).toFixed(1)}B`
                  }
                  return `$${value.toFixed(0)}M`
                }}
              />
              <Tooltip
                contentStyle={compactTooltip}
                formatter={(v) => {
                  const numValue = Number(v)
                  if (numValue >= 1000) {
                    return `$${(numValue / 1000).toFixed(1)}B`
                  }
                  return `$${numValue.toFixed(1)}M`
                }}
              />
              <Bar dataKey="revenue" fill="var(--sap-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Operating Margin Trend"
          subtitle={`Quarterly operating margin for selected brand – Fiscal Year ${selectedYear}`}
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={marginTrend} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border-subtle)" />
              <XAxis 
                dataKey="quarter" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value.toFixed(1)}%`}
              />
              <Tooltip
                contentStyle={compactTooltip}
                formatter={(v) => `${Number(v).toFixed(1)}%`}
              />
              <Line
                type="monotone"
                dataKey="margin"
                stroke="var(--sap-accent)"
                strokeWidth={2}
                dot={{ r: 3, fill: 'var(--sap-accent)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        title="Dealer and Region Performance"
        subtitle="Combined view of revenue, margin, and backlog by dealer"
        fullWidth
      >
        <DataTable
          columns={[
            { key: 'dealerId', label: 'Dealer ID' },
            { key: 'dealerName', label: 'Dealer Name' },
            { key: 'brand', label: 'Brand' },
            { key: 'region', label: 'Region' },
            {
              key: 'revenue',
              label: 'Revenue (USD, M)',
              align: 'right',
              format: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
            },
            {
              key: 'operatingMargin',
              label: 'Operating Margin (%)',
              align: 'right',
              format: (v) => Number(v).toFixed(1),
            },
            {
              key: 'backlog',
              label: 'Backlog (USD, M)',
              align: 'right',
              format: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
            },
            {
              key: 'backlogRisk',
              label: 'Backlog Risk',
            },
          ]}
          rows={tableRows}
        />
        <p className="page-footnote" style={{ marginTop: '16px', marginBottom: 0 }}>
          Illustrative dealer-level view powered by the same unified financial data model used in the dashboards.
        </p>
      </ChartCard>
    </div>
  )
}
