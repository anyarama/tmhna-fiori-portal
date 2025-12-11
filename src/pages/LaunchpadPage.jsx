import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from 'recharts'
import { kpiData } from '../data/financialData.js'
import { compactTooltip } from '../lib/charts.js'
import { PageHeader } from '../components/PageHeader.jsx'

function HomeSection({ title, children, className = '' }) {
  return (
    <section className={`home-section ${className}`}>
      <div className="home-section__header">
        <h2 className="home-section__title">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function HomeTile({ title, subtitle, kpiText, footerText, onClick, children }) {
  const isInteractive = Boolean(onClick)

  return (
    <div
      className={`fiori-tile ${isInteractive ? 'fiori-tile--interactive' : ''}`}
      onClick={onClick}
      role={isInteractive ? 'button' : 'group'}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <div className="fiori-tile__header">
        <div className="fiori-tile__title">{title}</div>
        {subtitle && <div className="fiori-tile__subtitle">{subtitle}</div>}
      </div>
      {kpiText && <div className="fiori-tile__kpi">{kpiText}</div>}
      {children}
      {footerText && <div className="fiori-tile__footer">{footerText}</div>}
    </div>
  )
}

const revenueTrend = [
  { name: 'Q1', value: 1.6 },
  { name: 'Q2', value: 1.8 },
  { name: 'Q3', value: 1.9 },
  { name: 'Q4', value: 1.95 },
]

export default function LaunchpadPage() {
  const navigate = useNavigate()

  const currentYearKpis = useMemo(() => {
    const latestYear = Math.max(...Object.keys(kpiData).map((y) => Number(y)))
    return kpiData[latestYear]
  }, [])

  // Cost center budget data for pie chart
  const costCenterPreview = {
    consumed: 68,
    budget: 100,
  }

  const costCenterPieData = [
    { name: 'Consumed', value: costCenterPreview.consumed },
    { name: 'Remaining', value: costCenterPreview.budget - costCenterPreview.consumed },
  ]

  // Inventory and backlog progress data
  const inventoryPreview = {
    current: 76,
    target: 85,
  }

  // Dealer margin preview data for horizontal bar chart
  const dealerMarginPreview = [
    { name: 'D1041', margin: 18.4, color: 'var(--sap-accent)' },
    { name: 'D2057', margin: 17.9, color: '#38bdf8' },
    { name: 'D3120', margin: 16.8, color: '#7dd3fc' },
  ]

  return (
    <div className="fiori-home">
      <PageHeader
        title="My Home"
        subtitle="Emma's personalized workspace for TMHNA financial intelligence"
      />

      <div className="fiori-home__content">
        {/* Top banner */}
        <div className="tile-grid tile-grid--wide top-banner-row">
          <div className="fiori-tile fiori-tile--news">
            <div className="fiori-tile--news__media" />
            <div className="fiori-tile--news__body">
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--sap-text-muted)',
                  marginBottom: '8px',
                }}
              >
                Financial Intelligence Update
              </div>
              <div className="fiori-tile__title">Q4 Financial Performance Exceeds Targets</div>
              <p className="fiori-tile--news__text">
                TMHNA delivered strong Q4 results across TMH, Raymond, and Toyota Heavy Duty brands.
                Outperformance driven by improved backlog conversion and margin discipline, with
                unified revenue reaching $7.2B YTD.
              </p>
              <div className="fiori-tile__footer">Today, TMHNA News – December 10, 2024</div>
            </div>
          </div>
        </div>

        {/* My Workspace */}
        <HomeSection title="My Workspace" className="home-section--workspace">
          <div className="tile-grid workspace-grid">
            <HomeTile
              title="My Finance Overview"
              subtitle="Unified revenue trend across TMH, Raymond, and THD"
              kpiText="7.2B Revenue YTD"
              footerText="Fiscal Year 2024"
            >
              <p className="workspace-tile__meta">
                TMH: $3.5B • Raymond: $2.3B • THD: $1.4B
              </p>
              <div className="workspace-tile__chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart data={revenueTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={compactTooltip} formatter={(v) => `$${v.toFixed(1)}B`} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--sap-accent)"
                      strokeWidth={2}
                      dot={{ r: 2, fill: 'var(--sap-accent)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </HomeTile>

            <HomeTile
              title="My Tasks"
              subtitle="Finance tasks requiring attention"
              kpiText="13 Outstanding Tasks"
              footerText="3 due this week"
            >
              <div className="task-summary">
                <div>5 journal approvals</div>
                <div>4 dealer rebate reviews</div>
                <div>4 backlog aging checks</div>
              </div>
            </HomeTile>

            <HomeTile title="Key Alerts" kpiText="3 Open Alerts" footerText="Continuous monitoring">
              <div className="tile-title-row tile-title-row--override">
                <span className="fiori-tile__title">Key Alerts</span>
                <span className="status-chip status-chip--critical">At Risk</span>
              </div>
              <div className="alert-line alert-line--critical">2 critical margin exceptions</div>
              <div className="alert-line alert-line--warning">1 backlog aging warning</div>
            </HomeTile>

            <HomeTile
              title="Close Calendar"
              subtitle="Month-end close timeline"
              kpiText="10 Days to Close"
            >
              <div className="workspace-tile__meta" style={{ marginTop: '0' }}>
                <div>Current period: Dec 2024</div>
                <div>Target close: 3 days</div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar__fill" style={{ width: '60%' }} />
              </div>
              <div className="progress-bar__label">60% of close window elapsed</div>
            </HomeTile>
          </div>
        </HomeSection>

        {/* Financial Intelligence */}
        <HomeSection title="Financial Intelligence" className="home-section--financial">
          <div className="tile-grid fi-grid">
            <HomeTile
              title="Financial Intelligence Dashboard"
              subtitle="Cross-brand revenue (preview from unified model)"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__chart" style={{ marginTop: '8px', marginBottom: '0' }}>
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={revenueTrend}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={compactTooltip} formatter={(v) => `$${v.toFixed(1)}B`} />
                    <Bar dataKey="value" fill="var(--sap-accent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="workspace-tile__meta" style={{ marginTop: '4px', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>YTD growth vs prior year:</span>
                <span className="growth-metric growth-metric--positive">
                  <span className="growth-metric__icon">↑</span>
                  <span className="growth-metric__value">+5.4%</span>
                </span>
              </div>
            </HomeTile>

            <HomeTile
              title="Dealer Margin Analysis"
              subtitle="Top dealer margins (illustrative)"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__chart" style={{ marginTop: '8px', height: '130px' }}>
                <ResponsiveContainer width="100%" height={130}>
                  <BarChart
                    data={dealerMarginPreview}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      width={45}
                      tickMargin={8}
                    />
                    <Tooltip
                      contentStyle={compactTooltip}
                      formatter={(v) => `${Number(v).toFixed(1)}%`}
                    />
                    <Bar
                      dataKey="margin"
                      radius={[0, 4, 4, 0]}
                      shape={(props) => {
                        const { payload, x, y, width, height } = props
                        const fillColor = payload?.color || 'var(--sap-accent)'
                        return (
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill={fillColor}
                            rx={4}
                            ry={4}
                          />
                        )
                      }}
                    >
                      <LabelList
                        dataKey="margin"
                        position="right"
                        formatter={(v) => `${Number(v).toFixed(1)}%`}
                        style={{ fontSize: '11px', fill: 'var(--sap-text-secondary)', fontWeight: 500 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </HomeTile>

            <HomeTile
              title="Inventory and Backlog"
              subtitle="Levels vs target"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__meta" style={{ marginTop: '0', marginBottom: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Current: {inventoryPreview.current}%</span>
                  <span>Target: {inventoryPreview.target}%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-bar__fill ${inventoryPreview.current >= inventoryPreview.target ? 'progress-bar__fill--success' : inventoryPreview.current >= inventoryPreview.target * 0.9 ? 'progress-bar__fill--warning' : 'progress-bar__fill--danger'}`}
                  style={{ width: `${inventoryPreview.current}%` }}
                />
              </div>
              <div className="workspace-tile__meta" style={{ marginTop: '6px', marginBottom: '0' }}>
                Backlog conversion improving. Aligning Raymond lead times with TMH.
              </div>
            </HomeTile>

            <HomeTile
              title="Cost Center Spend Tracking"
              subtitle="Budget consumption"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div
                className="workspace-tile__chart"
                style={{ position: 'relative', height: '120px', marginTop: '8px', marginBottom: '0' }}
              >
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={costCenterPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={32}
                      outerRadius={48}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell key="consumed" fill="var(--sap-accent)" />
                      <Cell key="remaining" fill="var(--sap-border-subtle)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--sap-text-main)',
                    pointerEvents: 'none',
                    textAlign: 'center',
                    lineHeight: '1.2',
                  }}
                >
                  <div>{costCenterPreview.consumed}%</div>
                  <div style={{ fontSize: '11px', fontWeight: 400, color: 'var(--sap-text-muted)', marginTop: '2px' }}>
                    Consumed
                  </div>
                </div>
              </div>
              <div className="donut-legend">
                <div className="donut-legend__item">
                  <span className="donut-legend__swatch donut-legend__swatch--opex" />
                  <span>Opex: 72%</span>
                </div>
                <div className="donut-legend__item">
                  <span className="donut-legend__swatch donut-legend__swatch--capex" />
                  <span>CAPEX: 61%</span>
                </div>
              </div>
            </HomeTile>
          </div>
        </HomeSection>
      </div>
    </div>
  )
}
