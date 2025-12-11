import { useState, useMemo } from 'react'
import {
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
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { PageHeader } from '../components/PageHeader.jsx'
import { KpiCard } from '../components/KpiCard.jsx'
import { ChartCard } from '../components/ChartCard.jsx'
import { DataTable } from '../components/DataTable.jsx'
import { FilterBar } from '../components/FilterBar.jsx'
import { CustomTooltip } from '../components/CustomTooltip.jsx'
import {
  fiscalYears,
  brands,
  regions,
  operatingMarginTrend,
  getFilteredData,
  getFilteredKPIs,
  getRevenueByBrand,
  getRevenueDistribution,
} from '../data/financialData.js'

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

export default function FinancialDashboardPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')

  const handleFilterChange = (key, value) => {
    if (key === 'year') {
      setSelectedYear(Number(value))
    } else if (key === 'brand') {
      setSelectedBrand(value)
    } else if (key === 'region') {
      setSelectedRegion(value)
    }
  }

  const filters = [
    {
      key: 'year',
      label: 'Fiscal Year',
      value: selectedYear,
      options: fiscalYears,
    },
    {
      key: 'brand',
      label: 'Brand',
      value: selectedBrand,
      options: brands,
    },
    {
      key: 'region',
      label: 'Region',
      value: selectedRegion,
      options: regions,
    },
  ]

  // Get filtered KPIs that respond to all filters
  const currentKpis = useMemo(() => {
    return getFilteredKPIs(selectedYear, selectedBrand, selectedRegion)
  }, [selectedYear, selectedBrand, selectedRegion])

  // Prepare revenue by brand chart data - responds to all filters
  const revenueChartData = useMemo(() => {
    const brandData = getRevenueByBrand(selectedYear, selectedBrand, selectedRegion)
    return Object.entries(brandData).map(([name, revenue]) => ({
      name,
      revenue,
    }))
  }, [selectedYear, selectedBrand, selectedRegion])

  // Get operating margin trend data - filtered by year
  const marginTrendData = operatingMarginTrend[selectedYear]

  // Get filtered detailed metrics
  const filteredMetrics = useMemo(() => {
    return getFilteredData(selectedYear, selectedBrand, selectedRegion)
  }, [selectedYear, selectedBrand, selectedRegion])

  // Revenue distribution for pie chart - responds to filters
  const revenueDistribution = useMemo(() => {
    return getRevenueDistribution(selectedYear, selectedBrand, selectedRegion)
  }, [selectedYear, selectedBrand, selectedRegion])

  // Top dealers by revenue for pie chart
  const topDealersByRevenue = useMemo(() => {
    const dealers = {}
    filteredMetrics.forEach((metric) => {
      if (dealers[metric.dealer]) {
        dealers[metric.dealer] += metric.revenue
      } else {
        dealers[metric.dealer] = metric.revenue
      }
    })
    return Object.entries(dealers)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [filteredMetrics])

  const tableColumns = [
    { key: 'brand', label: 'Brand', sortable: true },
    { key: 'dealer', label: 'Dealer', sortable: true },
    { key: 'region', label: 'Region', sortable: true },
    {
      key: 'revenue',
      label: 'Revenue (M)',
      sortable: true,
      align: 'right',
      format: (value) => `$${value.toFixed(1)}`,
    },
    {
      key: 'grossMargin',
      label: 'Gross Margin %',
      sortable: true,
      align: 'right',
      format: (value) => `${value.toFixed(1)}%`,
    },
    {
      key: 'operatingMargin',
      label: 'Operating Margin %',
      sortable: true,
      align: 'right',
      format: (value) => `${value.toFixed(1)}%`,
    },
    {
      key: 'backlog',
      label: 'Backlog (M)',
      sortable: true,
      align: 'right',
      format: (value) => `$${value.toFixed(1)}`,
    },
  ]

  return (
    <div className="fiori-page">
      <PageHeader
        title="Financial Intelligence Dashboard"
        subtitle="Unified view of financial performance across TMH, Raymond, and THD brands"
        actions={
          <>
            <button type="button" className="btn">
              Export
            </button>
            <button type="button" className="btn btn-primary">
              Refresh Data
            </button>
          </>
        }
      />

      <div className="filter-bar-container">
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="overview-grid">
        {/* Row 1: KPI Cards */}
        <div className="overview-row overview-row-kpis">
          <KpiCard
            label="Total Revenue (YTD)"
            value={currentKpis.totalRevenue.value}
            change={currentKpis.totalRevenue.change}
            unit={currentKpis.totalRevenue.unit}
            changeLabel="vs prior year"
          />
          <KpiCard
            label="Operating Margin (YTD)"
            value={currentKpis.operatingMargin.value}
            change={currentKpis.operatingMargin.change}
            unit={currentKpis.operatingMargin.unit}
            changeLabel="percentage points"
          />
          <KpiCard
            label="Backlog"
            value={currentKpis.backlog.value}
            change={currentKpis.backlog.change}
            unit={currentKpis.backlog.unit}
            changeLabel="vs prior month"
          />
          <KpiCard
            label="Days Sales Outstanding"
            value={currentKpis.daysSalesOutstanding.value}
            change={currentKpis.daysSalesOutstanding.change}
            unit={currentKpis.daysSalesOutstanding.unit}
            changeLabel="vs prior quarter"
          />
        </div>

        {/* Row 2: Charts */}
        <div className="overview-row overview-row-charts">
          <ChartCard
            title="Revenue by Brand"
            subtitle={`Fiscal Year ${selectedYear}${selectedBrand !== 'All' ? ` - ${selectedBrand}` : ''}${selectedRegion !== 'All' ? ` - ${selectedRegion}` : ''}`}
            footer="Data source: Unified Financial Data Model (Snowflake)"
          >
            <div className="chart-container compact-chart">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={revenueChartData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="var(--sap-muted)"
                    tick={{ fill: 'var(--sap-text)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--sap-border)' }}
                  />
                  <YAxis
                    stroke="var(--sap-muted)"
                    tick={{ fill: 'var(--sap-text)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--sap-border)' }}
                    tickFormatter={(value) => `$${value.toFixed(1)}B`}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip formatter={(value) => `$${value.toFixed(2)}B`} />
                    }
                  />
                  <Bar dataKey="revenue" fill="var(--sap-chart-color-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Operating Margin Trend"
            subtitle={`Monthly margin for ${selectedYear}`}
            footer="Last refresh: 10 min ago"
          >
            <div className="chart-container compact-chart">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={marginTrendData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="var(--sap-muted)"
                    tick={{ fill: 'var(--sap-text)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--sap-border)' }}
                  />
                  <YAxis
                    stroke="var(--sap-muted)"
                    tick={{ fill: 'var(--sap-text)', fontSize: 12 }}
                    axisLine={{ stroke: 'var(--sap-border)' }}
                    tickFormatter={(value) => `${value.toFixed(0)}%`}
                  />
                  <Tooltip
                    content={(props) => (
                      <CustomTooltip {...props} formatter={(value) => `${value.toFixed(1)}%`} />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="margin"
                    stroke="var(--sap-chart-color-1)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--sap-chart-color-1)', r: 4 }}
                    activeDot={{ r: 6, fill: 'var(--sap-chart-color-1)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Revenue Distribution"
            subtitle={`${selectedYear} - ${selectedBrand !== 'All' ? selectedBrand : 'All Brands'}${selectedRegion !== 'All' ? ` - ${selectedRegion}` : ''}`}
            footer="Data source: Unified Financial Data Model (Snowflake)"
          >
            <div className="chart-container pie-chart-container">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: 'var(--sap-text)', strokeWidth: 1 }}
                  >
                    {revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={(props) => (
                      <CustomTooltip {...props} formatter={(value) => `$${value.toFixed(2)}B`} />
                    )}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                    iconType="circle"
                    formatter={(value) => value}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Row 3: Additional Charts */}
        <div className="overview-row overview-row-charts">
          <ChartCard
            title="Top Dealers by Revenue"
            subtitle={`Top 5 dealers - ${selectedYear}`}
            footer="Data source: Unified Financial Data Model (Snowflake)"
          >
            <div className="chart-container pie-chart-container">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={topDealersByRevenue}
                    dataKey="revenue"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => {
                      const shortName = name.length > 15 ? `${name.substring(0, 15)}...` : name
                      return `${shortName} ${(percent * 100).toFixed(0)}%`
                    }}
                    labelLine={{ stroke: 'var(--sap-text)', strokeWidth: 1 }}
                  >
                    {topDealersByRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={(props) => (
                      <CustomTooltip {...props} formatter={(value) => `$${value.toFixed(1)}M`} />
                    )}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                    iconType="circle"
                    formatter={(value) => {
                      const shortName = value.length > 20 ? `${value.substring(0, 20)}...` : value
                      return shortName
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Row 4: Detailed Table */}
        <div className="overview-row overview-row-details">
          <ChartCard
            title="Detailed Financial Metrics"
            subtitle={`By dealer and region - ${selectedYear}${selectedBrand !== 'All' ? ` - ${selectedBrand}` : ''}${selectedRegion !== 'All' ? ` - ${selectedRegion}` : ''}`}
            footer="Data source: Unified Financial Data Model (Snowflake) | Last refresh: 10 min ago"
            className="full-width-card"
          >
            <DataTable data={filteredMetrics} columns={tableColumns} />
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
