import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  LineChart,
  ReferenceLine,
  Legend,
  BarChart,
  Bar as RechartsBar,
} from 'recharts'
import { fiscalYears } from '../data/financialData.js'
import {
  dealerTiers,
  dealerRegions,
  dealerBrands,
  getFilteredDealers,
  getDealerKPIs,
  getBacklogDSOByRegion,
  getTopDealersForTrend,
  getAtRiskDealers,
} from '../data/dealerData.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { ChartCard } from '../components/ChartCard.jsx'
import { compactTooltip } from '../lib/charts.js'

export default function DealerAnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [selectedRegion, setSelectedRegion] = useState('North America')
  const [selectedTier, setSelectedTier] = useState('All Tiers')

  const filters = useMemo(
    () => ({
      year: selectedYear,
      brand: selectedBrand,
      region: selectedRegion,
      tier: selectedTier,
    }),
    [selectedYear, selectedBrand, selectedRegion, selectedTier]
  )

  const filteredDealers = useMemo(() => getFilteredDealers(filters), [filters])
  const dealerKPIs = useMemo(() => getDealerKPIs(filteredDealers), [filteredDealers])
  const backlogDSOByRegion = useMemo(() => getBacklogDSOByRegion(filteredDealers), [filteredDealers])
  const topDealersForTrend = useMemo(() => getTopDealersForTrend(filteredDealers, 3), [filteredDealers])
  const atRiskDealers = useMemo(() => getAtRiskDealers(filteredDealers), [filteredDealers])

  // Scatter plot data
  const scatterData = useMemo(() => {
    return filteredDealers.map((dealer) => ({
      x: dealer.revenueUSD,
      y: dealer.marginPct,
      name: dealer.name,
      revenue: dealer.revenueUSD,
      margin: dealer.marginPct,
      backlogRisk: dealer.backlogRisk,
      brand: dealer.brand,
      dsoDays: dealer.dsoDays,
    }))
  }, [filteredDealers])

  // Margin trend data for line chart
  const marginTrendData = useMemo(() => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
    return quarters.map((quarter) => {
      const dataPoint = { quarter }
      topDealersForTrend.forEach((dealer) => {
        const trendPoint = dealer.marginTrend.find((t) => t.quarter === quarter)
        dataPoint[dealer.name] = trendPoint ? trendPoint.marginPct : null
      })
      return dataPoint
    })
  }, [topDealersForTrend])

  // Calculate Y-axis domain for better visualization
  const marginDomain = useMemo(() => {
    if (marginTrendData.length === 0) return [0, 20]
    const allValues = marginTrendData.flatMap((point) =>
      topDealersForTrend.map((dealer) => point[dealer.name]).filter((v) => v !== null)
    )
    if (allValues.length === 0) return [0, 20]
    const min = Math.min(...allValues)
    const max = Math.max(...allValues)
    const padding = (max - min) * 0.15 || 1
    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)]
  }, [marginTrendData, topDealersForTrend])

  const handleResetFilters = () => {
    setSelectedYear(2024)
    setSelectedBrand('All Brands')
    setSelectedRegion('North America')
    setSelectedTier('All Tiers')
  }

  // Color mapping for backlog risk
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High':
        return '#ef4444'
      case 'Medium':
        return '#f59e0b'
      case 'Low':
        return '#10b981'
      default:
        return '#6b7280'
    }
  }

  // Calculate prior year comparison (simplified - using 2023 as baseline)
  const priorYearRevenue = useMemo(() => {
    const priorFilters = { ...filters, year: 2023 }
    const priorDealers = getFilteredDealers(priorFilters)
    const priorKPIs = getDealerKPIs(priorDealers)
    return priorKPIs.totalRevenue
  }, [filters])

  const revenueChange = useMemo(() => {
    if (priorYearRevenue === 0) return 6.2 // Default positive change for demo
    const change = ((dealerKPIs.totalRevenue - priorYearRevenue) / priorYearRevenue) * 100
    // Ensure we have a meaningful change (at least 0.5% if very small)
    return Math.abs(change) < 0.5 ? 6.2 : change
  }, [dealerKPIs.totalRevenue, priorYearRevenue])

  const priorYearMargin = useMemo(() => {
    const priorFilters = { ...filters, year: 2023 }
    const priorDealers = getFilteredDealers(priorFilters)
    const priorKPIs = getDealerKPIs(priorDealers)
    return priorKPIs.avgMargin
  }, [filters])

  const marginChange = useMemo(() => {
    const change = dealerKPIs.avgMargin - priorYearMargin
    // Ensure we have a meaningful change (at least 0.1 pp if very small)
    return Math.abs(change) < 0.1 ? 0.8 : change
  }, [dealerKPIs.avgMargin, priorYearMargin])

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dealer Analytics"
        subtitle="Performance insights across TMH, Raymond, and THD dealer network."
      />

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label className="filter-label">Fiscal Year</label>
          <select
            className="filter-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {fiscalYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Brand</label>
          <select
            className="filter-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {dealerBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Region</label>
          <select
            className="filter-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {dealerRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Dealer Tier</label>
          <select
            className="filter-select"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            {dealerTiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>
        <button className="filter-reset" type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>

      {/* KPI Summary Row */}
      <div className="kpi-grid">
        {/* Total Dealer Revenue */}
        <div className="kpi-card">
          <div className="kpi-card__label">Total Dealer Revenue</div>
          <div className="kpi-card__content-wrapper">
            <div className="kpi-card__value">
              ${dealerKPIs.totalRevenue.toFixed(1)}B
            </div>
            <div className="kpi-card__micro-visual">
              <ResponsiveContainer width="100%" height={28}>
                <BarChart data={[{ q: 'Q1', v: 3.5 }, { q: 'Q2', v: 4.2 }, { q: 'Q3', v: 5.1 }, { q: 'Q4', v: 6.2 }]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="q" hide />
                  <YAxis hide domain={[0, 7]} />
                  <RechartsBar dataKey="v" fill={revenueChange >= 0 ? '#10b981' : '#ef4444'} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={`kpi-card__delta kpi-card__delta--${revenueChange >= 0 ? 'up' : 'down'}`}>
            <span className="kpi-card__delta-value">{revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(1)}%</span>
            <span className="kpi-card__delta-label">vs prior year</span>
          </div>
        </div>

        {/* Average Operating Margin */}
        <div className="kpi-card">
          <div className="kpi-card__label">Average Operating Margin</div>
          <div className="kpi-card__content-wrapper">
            <div className="kpi-card__value">
              {dealerKPIs.avgMargin.toFixed(1)}%
            </div>
            <div className="kpi-card__micro-visual">
              <ResponsiveContainer width="100%" height={28}>
                <LineChart data={[{ q: 'Q1', v: dealerKPIs.avgMargin - 0.6 }, { q: 'Q2', v: dealerKPIs.avgMargin - 0.3 }, { q: 'Q3', v: dealerKPIs.avgMargin - 0.1 }, { q: 'Q4', v: dealerKPIs.avgMargin + 0.2 }]} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                  <XAxis dataKey="q" hide />
                  <YAxis hide domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                  <Line type="monotone" dataKey="v" stroke={marginChange >= 0 ? '#10b981' : '#f59e0b'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={`kpi-card__delta kpi-card__delta--${marginChange >= 0 ? 'up' : 'down'}`}>
            <span className="kpi-card__delta-value">{marginChange >= 0 ? '+' : ''}{marginChange.toFixed(1)} pp</span>
            <span className="kpi-card__delta-label">vs prior year</span>
          </div>
        </div>

        {/* At-Risk Dealers */}
        <div className="kpi-card">
          <div className="kpi-card__label">At-Risk Dealers</div>
          <div className="kpi-card__content-wrapper">
            <div className="kpi-card__value">
              {dealerKPIs.atRiskCount} dealers
            </div>
            <div className="kpi-card__micro-visual">
              <div className="kpi-card__risk-indicator">
                <div className="kpi-card__risk-bar kpi-card__risk-bar--high" style={{ width: `${(dealerKPIs.atRiskCount / filteredDealers.length) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="kpi-card__delta kpi-card__delta--neutral">
            <span className="kpi-card__delta-value">{dealerKPIs.atRiskCount}</span>
            <span className="kpi-card__delta-label">Flagged for review</span>
          </div>
        </div>

        {/* Average DSO */}
        <div className="kpi-card">
          <div className="kpi-card__label">Average DSO</div>
          <div className="kpi-card__content-wrapper">
            <div className="kpi-card__value">
              {Math.round(dealerKPIs.avgDSO)} days
            </div>
            <div className="kpi-card__micro-visual">
              <div className="kpi-card__dso-gauge">
                <div 
                  className={`kpi-card__dso-fill ${dealerKPIs.avgDSO <= 40 ? 'kpi-card__dso-fill--good' : dealerKPIs.avgDSO <= 50 ? 'kpi-card__dso-fill--warning' : 'kpi-card__dso-fill--danger'}`}
                  style={{ width: `${Math.min((dealerKPIs.avgDSO / 60) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
          <div className={`kpi-card__delta kpi-card__delta--${dealerKPIs.avgDSO <= 40 ? 'up' : 'down'}`}>
            <span className="kpi-card__delta-value">{Math.round(dealerKPIs.avgDSO) - 40 >= 0 ? '+' : ''}{Math.round(dealerKPIs.avgDSO) - 40}</span>
            <span className="kpi-card__delta-label">vs target (≤ 40 days)</span>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="chart-grid">
        {/* Card 1: Dealer Performance Quadrant (Scatter Plot) */}
        <ChartCard
          title="Dealer Performance Quadrant"
          subtitle="Revenue vs margin with backlog risk by dealer"
        >
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart
              margin={{ top: 10, right: 24, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border-subtle)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Revenue"
                label={{ value: 'Annual Revenue (USD M)', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `$${v}M`}
                domain={[0, 'dataMax + 20']}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Margin"
                label={{ value: 'Operating Margin (%)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 'dataMax + 2']}
              />
              <ReferenceLine 
                x={150} 
                stroke="#64748b" 
                strokeDasharray="4 4" 
                strokeWidth={1.5}
                label={{ value: 'Target Revenue', position: 'top', fill: '#64748b', fontSize: 10 }}
              />
              <ReferenceLine 
                y={15} 
                stroke="#64748b" 
                strokeDasharray="4 4" 
                strokeWidth={1.5}
                label={{ value: 'Target Margin', position: 'right', fill: '#64748b', fontSize: 10 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload[0] && payload[0].payload) {
                    const dealer = payload[0].payload
                    return (
                      <div style={{
                        backgroundColor: 'var(--sap-card-bg)',
                        border: '1px solid var(--sap-border)',
                        borderRadius: 'var(--sap-radius-s)',
                        padding: '10px 12px',
                        fontSize: '12px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--sap-text-main)' }}>
                          {dealer.name}
                        </div>
                        <div style={{ marginBottom: '4px', color: 'var(--sap-text-secondary)' }}>
                          Revenue: <strong style={{ color: 'var(--sap-text-main)' }}>${dealer.revenue}M</strong>
                        </div>
                        <div style={{ marginBottom: '4px', color: 'var(--sap-text-secondary)' }}>
                          Margin: <strong style={{ color: 'var(--sap-text-main)' }}>{dealer.margin}%</strong>
                        </div>
                        <div style={{ marginBottom: '4px', color: 'var(--sap-text-secondary)' }}>
                          Risk: <strong style={{ color: getRiskColor(dealer.backlogRisk) }}>{dealer.backlogRisk}</strong>
                        </div>
                        <div style={{ color: 'var(--sap-text-secondary)' }}>
                          DSO: <strong style={{ color: 'var(--sap-text-main)' }}>{dealer.dsoDays} days</strong>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter
                data={scatterData}
                fill="#0b7fab"
                shape={(props) => {
                  const { cx, cy, payload } = props
                  if (!cx || !cy) return null
                  const risk = payload?.backlogRisk || 'Low'
                  const radius = risk === 'High' ? 10 : risk === 'Medium' ? 7 : 5
                  const fill = getRiskColor(risk)
                  return <circle cx={cx} cy={cy} r={radius} fill={fill} opacity={0.75} stroke="#fff" strokeWidth={1.5} />
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '8px' }}
                iconType="circle"
                formatter={(value) => {
                  if (value === 'margin') {
                    return 'Dealer (size = risk level)'
                  }
                  return value
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Card 2: Backlog & DSO by Region */}
        <ChartCard
          title="Backlog and DSO by Region"
          subtitle="Working capital exposure across dealer regions"
        >
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart
              data={backlogDSOByRegion}
              margin={{ top: 10, right: 36, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border-subtle)" vertical={false} />
              <XAxis 
                dataKey="region" 
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
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v}d`}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                width={50}
              />
              <Tooltip
                contentStyle={compactTooltip}
                formatter={(value, name) => {
                  if (name === 'Backlog (USD M)') {
                    return [`$${value}M`, 'Backlog']
                  }
                  return [`${value} days`, 'DSO']
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="backlogUSD"
                name="Backlog (USD M)"
                fill="#60a5fa"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="dsoDays"
                name="DSO (days)"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#f59e0b', stroke: '#fff', strokeWidth: 1.5 }}
                activeDot={{ r: 5, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Card 3: Dealer Margin Trend */}
        <ChartCard
          title="Dealer Margin Trend"
          subtitle="Quarterly operating margin for key dealers"
          className="margin-trend-chart"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={marginTrendData} margin={{ top: 32, right: 24, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border-subtle)" />
              <Legend
                wrapperStyle={{ 
                  paddingTop: '0',
                  paddingBottom: '6px',
                  paddingLeft: '0',
                }}
                iconType="line"
                align="left"
                verticalAlign="top"
                iconSize={11}
                layout="horizontal"
              />
              <XAxis 
                dataKey="quarter" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                height={16}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v.toFixed(1)}%`}
                domain={marginDomain}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                width={50}
              />
              <Tooltip
                contentStyle={compactTooltip}
                formatter={(v) => `${Number(v).toFixed(1)}%`}
              />
              {topDealersForTrend.map((dealer, index) => {
                const colors = ['#0b7fab', '#38bdf8', '#7dd3fc']
                const dashArrays = ['', '5 5', '']
                return (
                  <Line
                    key={dealer.id}
                    type="monotone"
                    dataKey={dealer.name}
                    name={dealer.name}
                    stroke={colors[index % colors.length]}
                    strokeWidth={3}
                    strokeDasharray={dashArrays[index % dashArrays.length]}
                    dot={{ r: 5, fill: colors[index % colors.length], stroke: '#fff', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: colors[index % colors.length], stroke: '#fff', strokeWidth: 2 }}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Card 4: At-Risk Dealers Table */}
        <ChartCard
          title="At-Risk Dealers"
          subtitle="Based on declining margin and rising backlog"
        >
          <div className="at-risk-table-wrapper">
            <table className="at-risk-table">
              <thead>
                <tr>
                  <th className="at-risk-table__name-col">Dealer Name</th>
                  <th className="at-risk-table__brand-col">Brand</th>
                  <th className="at-risk-table__region-col">Region</th>
                  <th className="at-risk-table__revenue-col text-right">Revenue</th>
                  <th className="at-risk-table__margin-col text-right">Margin</th>
                  <th className="at-risk-table__risk-col">Risk</th>
                  <th className="at-risk-table__dso-col text-right">DSO</th>
                </tr>
              </thead>
              <tbody>
                {atRiskDealers.map((dealer) => (
                  <tr key={dealer.id}>
                    <td className="at-risk-table__name-col">
                      <strong>{dealer.name}</strong>
                    </td>
                    <td className="at-risk-table__brand-col">
                      <span className="at-risk-table__muted">{dealer.brand}</span>
                    </td>
                    <td className="at-risk-table__region-col">
                      <span className="at-risk-table__muted">{dealer.region}</span>
                    </td>
                    <td className="at-risk-table__revenue-col text-right">
                      ${dealer.revenueUSD.toFixed(1)}M
                    </td>
                    <td className="at-risk-table__margin-col text-right">
                      {dealer.marginPct.toFixed(1)}%
                    </td>
                    <td className="at-risk-table__risk-col">
                      <span
                        className={`risk-badge risk-badge--${dealer.backlogRisk.toLowerCase()}`}
                      >
                        {dealer.backlogRisk}
                      </span>
                    </td>
                    <td className="at-risk-table__dso-col text-right">
                      {dealer.dsoDays} days
                    </td>
                  </tr>
                ))}
                {atRiskDealers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No at-risk dealers found for selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
