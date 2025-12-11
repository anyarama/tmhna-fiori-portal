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
              <div className="workspace-tile__meta">
                Journal approvals, dealer rebate approvals, backlog review, and month-end close
                activities pending across TMHNA finance operations.
              </div>
            </HomeTile>

            <HomeTile title="Key Alerts" kpiText="3 Open Alerts" footerText="Continuous monitoring">
              <div className="workspace-tile__meta">
                <span className="text-critical">2 critical</span> margin exceptions and{' '}
                <span className="text-warning">1 warning</span> on backlog aging surfaced by the
                unified financial data model across TMH, Raymond, and THD.
              </div>
            </HomeTile>

            <HomeTile
              title="Close Calendar"
              subtitle="Month-end close timeline"
              kpiText="10 Days to Close"
              footerText="Target: Close in 3 days"
            >
              <div className="workspace-tile__meta">
                December 2024 month-end close in progress. TMHNA targets a shorter close cycle to
                accelerate financial reporting across unified brands.
              </div>
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
              <div className="workspace-tile__chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={revenueTrend}
                    margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={compactTooltip} formatter={(v) => `$${v.toFixed(1)}B`} />
                    <Bar dataKey="value" fill="var(--sap-accent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </HomeTile>

            <HomeTile
              title="Dealer Margin Analysis"
              subtitle="Top dealer margins (illustrative)"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <ul className="workspace-tile__list">
                <li>
                  Dealer 1041 (TMH) – <span className="text-good">18.4% margin</span>
                </li>
                <li>
                  Dealer 2057 (Raymond) – <span className="text-good">17.9% margin</span>
                </li>
                <li>Dealer 3120 (THD) – 16.8% margin</li>
              </ul>
              <div className="workspace-tile__meta" style={{ marginTop: '8px' }}>
                High-margin dealers across TMH and Raymond brands.
              </div>
            </HomeTile>

            <HomeTile
              title="Inventory and Backlog"
              subtitle="Levels vs target"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'var(--sap-text-muted)',
                    marginBottom: '4px',
                  }}
                >
                  <span>Current: {inventoryPreview.current}%</span>
                  <span>Target: {inventoryPreview.target}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--sap-border-subtle)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(inventoryPreview.current / inventoryPreview.target) * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--sap-accent)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
              <div className="workspace-tile__meta">
                Backlog conversion improving; spotlight on aligning Raymond lead times with TMH.
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
                style={{ position: 'relative', height: '100px', marginTop: '8px' }}
              >
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={costCenterPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={40}
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
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--sap-text-main)',
                    pointerEvents: 'none',
                  }}
                >
                  {costCenterPreview.consumed}%
                </div>
              </div>
              <div className="workspace-tile__meta" style={{ marginTop: '8px' }}>
                {costCenterPreview.consumed}% of annual SG&A budget consumed
              </div>
            </HomeTile>
          </div>
        </HomeSection>
      </div>
    </div>
  )
}
