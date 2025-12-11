import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
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
} from 'recharts'
import { revenueByBrand, detailedMetrics, getRevenueDistribution } from '../data/financialData.js'

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Helper: compact tooltip style
const compactTooltip = {
  backgroundColor: 'var(--sap-card-bg)',
  border: '1px solid var(--sap-border)',
  borderRadius: 'var(--sap-radius-s)',
  fontSize: '12px',
}

// Helper component for sections
function HomeSection({ title, children, className = '' }) {
  return (
    <div className={`home-section ${className}`}>
      <div className="home-section__header">
        <h2 className="home-section__title">{title}</h2>
      </div>
      {children}
    </div>
  )
}

// Helper component for tiles
function HomeTile({ title, subtitle, kpiText, footerText, children, onClick, className = '' }) {
  return (
    <div
      className={`fiori-tile workspace-tile ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="fiori-tile__content">
        <h3 className="fiori-tile__title">{title}</h3>
        {subtitle && <p className="fiori-tile__subtitle">{subtitle}</p>}
        {kpiText && <div className="workspace-tile__kpi">{kpiText}</div>}
        {children}
        {footerText && <div className="fiori-tile__footer">{footerText}</div>}
      </div>
    </div>
  )
}

export default function LaunchpadPage() {
  const navigate = useNavigate()

  // Revenue trend for micro sparkline (My Finance Overview)
  const revenueTrend = useMemo(() => {
    const brandData = revenueByBrand[2024].All
    return Object.entries(brandData).map(([name, value]) => ({ name, value }))
  }, [])

  // Top dealers for margin list (use detailedMetrics)
  const topDealers = useMemo(() => {
    return [...detailedMetrics]
      .sort((a, b) => b.operatingMargin - a.operatingMargin)
      .slice(0, 3)
      .map((item) => ({
        name: item.dealer.length > 22 ? `${item.dealer.slice(0, 22)}…` : item.dealer,
        margin: item.operatingMargin,
      }))
  }, [])

  // Inventory/backlog preview
  const inventoryPreview = { current: 78, target: 90 }

  // Cost center preview
  const costCenterPreview = { consumed: 68, budget: 100 }

  return (
    <div className="fiori-home">
      <div className="fiori-home__content">
        {/* Persona subtitle */}
        <p className="fiori-home__subtitle">Emma&apos;s personalized workspace for TMHNA financial intelligence.</p>

        {/* Top row: News banner */}
        <div className="tile-grid tile-grid--wide top-banner-row">
          <div className="fiori-tile fiori-tile--wide fiori-tile--news">
            <div className="fiori-tile__media">
              <div className="fiori-tile__media-placeholder">Financial Intelligence Update</div>
            </div>
            <div className="fiori-tile__content">
              <h3 className="fiori-tile__title">Q4 Financial Performance Exceeds Targets</h3>
              <p className="fiori-tile__subtitle">
                TMHNA exceeded Q4 targets across TMH, Raymond, and THD with stronger operating margins and backlog
                reduction.
              </p>
              <div className="fiori-tile__footer">Today, TMHNA News · December 10, 2024</div>
            </div>
          </div>
        </div>

        {/* Section 1: My Workspace */}
        <HomeSection title="My Workspace">
          <div className="tile-grid tile-grid--wide">
            <HomeTile
              title="My Finance Overview"
              subtitle="Revenue trend by brand"
              kpiText="7.2B Revenue YTD"
              footerText="Fiscal Year 2024"
            >
              <div className="workspace-tile__chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart data={revenueTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border)" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ display: 'none' }}
                      cursor={false}
                      isAnimationActive={false}
                    />
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
              subtitle="All items"
              kpiText="13 Outstanding Tasks"
              footerText="Last updated: Today"
            >
              <div className="workspace-tile__meta">Most urgent: 3 due this week</div>
            </HomeTile>

            <HomeTile title="Key Alerts" kpiText="3 Open Alerts" footerText="Requires attention">
              <div className="workspace-tile__meta">
                <span className="alert-critical">2 Critical</span> · <span className="alert-warning">1 Warning</span>
              </div>
            </HomeTile>

            <HomeTile title="My Timesheet" kpiText="10 Days Missing" footerText="Submit by end of month">
              <div className="workspace-tile__meta">Current period: Dec 2024</div>
            </HomeTile>
          </div>
        </HomeSection>

        {/* Section 2: Financial Intelligence */}
        <HomeSection title="Financial Intelligence">
          <div className="tile-grid">
            <HomeTile
              title="Financial Intelligence Dashboard"
              subtitle="Revenue by brand (preview)"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart data={revenueTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border)" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ display: 'none' }}
                      cursor={false}
                      isAnimationActive={false}
                    />
                    <Bar dataKey="value" fill="var(--sap-accent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </HomeTile>

            <HomeTile
              title="Dealer Margin Analysis"
              subtitle="Top dealer margins"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__preview">
                <div className="workspace-tile__list">
                  {topDealers.map((d, idx) => (
                    <div key={idx} className="dealer-row">
                      <div className="dealer-row__left">
                        <span className="dealer-rank">#{idx + 1}</span>
                        <span className="dealer-name">{d.name}</span>
                      </div>
                      <div className="dealer-row__right">
                        <div className="dealer-margin-bar">
                          <div
                            className="dealer-margin-bar__fill"
                            style={{ width: `${(d.margin / 20) * 100}%` }}
                          />
                        </div>
                        <span className="dealer-margin">{d.margin.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HomeTile>

            <HomeTile
              title="Inventory and Backlog"
              subtitle="Levels vs target"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__preview">
                <div className="workspace-tile__progress">
                  <div className="progress-bar">
                    <div
                      className="progress-bar__fill"
                      style={{ width: `${(inventoryPreview.current / inventoryPreview.target) * 100}%` }}
                    />
                  </div>
                  <div className="workspace-tile__meta">
                    <span className="inventory-current">Current: {inventoryPreview.current}%</span>
                    <span className="inventory-target">Target: {inventoryPreview.target}%</span>
                  </div>
                </div>
              </div>
            </HomeTile>

            <HomeTile
              title="Cost Center Spend Tracking"
              subtitle="Budget consumption"
              footerText="Go to dashboard"
              onClick={() => navigate('/dashboard')}
            >
              <div className="workspace-tile__preview">
                <div className="workspace-tile__donut">
                  <div className="donut-chart-mini">
                    <svg viewBox="0 0 100 100" className="donut-svg">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="var(--sap-border)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="var(--sap-accent)"
                        strokeWidth="8"
                        strokeDasharray={`${costCenterPreview.consumed * 2.51} ${251 - costCenterPreview.consumed * 2.51}`}
                        strokeDashoffset="62.75"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="donut-label">{costCenterPreview.consumed}%</div>
                  </div>
                  <div className="workspace-tile__meta">
                    <span className="budget-consumed">of budget consumed</span>
                  </div>
                </div>
              </div>
            </HomeTile>
          </div>
        </HomeSection>
      </div>
    </div>
  )
}

