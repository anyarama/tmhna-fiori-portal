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
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
  Label,
} from 'recharts'
import {
  fiscalYears,
  brands,
  regions,
  kpiData,
  revenueByBrand,
  operatingMarginTrend,
  getFilteredData,
  getRevenueDistribution,
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

  // Revenue mix by brand for donut chart
  const revenueMixByBrand = useMemo(() => {
    const yearData = revenueByBrand[selectedYear]
    if (!yearData || !yearData.All) return []

    const entries = Object.entries(yearData.All)
    const total = entries.reduce((sum, [, value]) => sum + value, 0)

    return entries.map(([brandName, value]) => ({
      name: brandName,
      value,
      share: total ? (value / total) * 100 : 0,
    }))
  }, [selectedYear])

  const filteredMetrics = useMemo(
    () => getFilteredData(selectedYear, selectedBrand, selectedRegion),
    [selectedYear, selectedBrand, selectedRegion]
  )

  // Revenue distribution for pie chart
  const revenueDistribution = useMemo(() => {
    return getRevenueDistribution(selectedYear, selectedBrand, selectedRegion)
  }, [selectedYear, selectedBrand, selectedRegion])

  // Backlog and DSO by brand for combo chart
  const backlogAndDsoByBrand = useMemo(() => {
    // Static data structure for working capital view by brand
    // Backlog in USD millions, DSO in days
    return [
      { brand: 'TMH', backlogUSD: 1300, dsoDays: 44 },
      { brand: 'Raymond', backlogUSD: 900, dsoDays: 49 },
      { brand: 'THD', backlogUSD: 600, dsoDays: 38 },
    ]
  }, [selectedYear])

  // Top dealers by revenue for preview
  const topDealers = useMemo(() => {
    return [...filteredMetrics]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((dealer, index) => ({
        rank: index + 1,
        name: dealer.dealer,
        brand: dealer.brand,
        revenue: dealer.revenue,
        margin: dealer.operatingMargin,
      }))
  }, [filteredMetrics])

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

  // Pie chart colors
  const PIE_COLORS = ['#0b7fab', '#38bdf8', '#7dd3fc', '#bae6fd']

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

      <div className="chart-grid chart-grid--three">
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

        <ChartCard
          title="Revenue Mix by Brand"
          subtitle={`Share of total revenue – Fiscal Year ${selectedYear}`}
        >
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <Pie
                  data={revenueMixByBrand}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  label={({ share }) => `${share.toFixed(0)}%`}
                  labelLine={false}
                >
                  {revenueMixByBrand.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        index === 0
                          ? 'var(--sap-accent)'
                          : index === 1
                          ? '#38bdf8'
                          : '#7dd3fc'
                      }
                    />
                  ))}
                  <Label
                    position="center"
                    content={(props) => {
                      const { cx, cy } = props.viewBox || {}
                      if (!cx || !cy) return null
                      const total = revenueMixByBrand.reduce((sum, d) => sum + d.value, 0)
                      const totalStr = total >= 1 ? `$${total.toFixed(1)}B` : `$${(total * 1000).toFixed(0)}M`
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={cx} dy="-0.4em" fontSize={12} fill="#6b7280">
                            Total FY {selectedYear}
                          </tspan>
                          <tspan x={cx} dy="1.4em" fontSize={14} fontWeight={600} fill="#111827">
                            {totalStr}
                          </tspan>
                        </text>
                      )
                    }}
                  />
                </Pie>
                <Tooltip
                  contentStyle={{
                    ...compactTooltip,
                    fontSize: '12px',
                    padding: '8px 12px',
                  }}
                  formatter={(value, _name, { payload }) => {
                    const numValue = Number(value)
                    const valueStr = numValue >= 1 ? `$${numValue.toFixed(1)}B` : `$${(numValue * 1000).toFixed(0)}M`
                    return [valueStr, `${payload.name}: ${payload.share.toFixed(1)}%`]
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ marginTop: 8, fontSize: 12 }}
                  formatter={(value, entry) => {
                    const entryData = revenueMixByBrand.find((d) => d.name === value)
                    if (!entryData) return value
                    const valueStr = entryData.value >= 1 ? `$${entryData.value.toFixed(1)}B` : `$${(entryData.value * 1000).toFixed(0)}M`
                    return `${value}: ${valueStr} (${entryData.share.toFixed(1)}%)`
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="chart-grid">
        <ChartCard
          title="Backlog and DSO by Brand"
          subtitle={`Working capital view – Fiscal Year ${selectedYear}`}
          className="backlog-dso-card"
        >
          <div className="kpi-legend kpi-legend--inline">
            <span className="kpi-legend__item">
              <span className="kpi-legend__dot kpi-legend__dot--backlog" />
              Backlog (USD M)
            </span>
            <span className="kpi-legend__item">
              <span className="kpi-legend__dot kpi-legend__dot--dso" />
              DSO (days)
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart
              data={backlogAndDsoByBrand}
              margin={{ top: 20, right: 36, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#edf1f5" vertical={false} />
              <XAxis 
                dataKey="brand" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `$${v}M`}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                width={60}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[30, 60]}
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${v}d`}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                width={50}
              />
              <Tooltip
                contentStyle={compactTooltip}
                formatter={(value, name) => {
                  if (name === 'Backlog (USD M)') {
                    return [`$${value}M`, 'Backlog (USD M)']
                  }
                  return [`${value} days`, 'DSO (days)']
                }}
                labelFormatter={(label) => `Brand: ${label}`}
              />
              <Bar
                yAxisId="left"
                dataKey="backlogUSD"
                name="Backlog (USD M)"
                fill="#0b78c8"
                barSize={48}
                radius={[6, 6, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="dsoDays"
                name="DSO (days)"
                stroke="#1aa3b8"
                strokeWidth={2.5}
                dot={{ r: 5, fill: '#1aa3b8', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#1aa3b8' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Top 5 Dealers by Revenue"
          subtitle={`Highest revenue dealers for selected filters – Fiscal Year ${selectedYear}`}
        >
          <div className="top-dealers-list">
            {topDealers.map((dealer) => (
              <div key={dealer.name} className="top-dealers-list__item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--sap-accent-soft)',
                      color: 'var(--sap-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {dealer.rank}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sap-text-main)' }}>
                      {dealer.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--sap-text-muted)' }}>
                      {dealer.brand}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '16px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sap-text-main)' }}>
                    ${dealer.revenue.toFixed(1)}M
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--sap-text-muted)' }}>
                    {dealer.margin.toFixed(1)}% margin
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Dealer and Region Performance"
        subtitle="Combined view of revenue, margin, and backlog by dealer"
        fullWidth
      >
        <div className="data-table-wrapper">
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
        </div>
        <p className="table-footnote">
          Illustrative dealer-level view powered by the same unified financial data foundation used in the dashboards.
        </p>
      </ChartCard>
    </div>
  )
}
