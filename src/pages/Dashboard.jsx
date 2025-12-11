import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../components/PageHeader.jsx'
import { SectionCard } from '../components/SectionCard.jsx'
import { StatTile } from '../components/StatTile.jsx'

const statTiles = [
  { label: 'Open orders', value: '128', trend: '12 new today', tone: 'neutral' },
  { label: 'On-time delivery', value: '96.4%', trend: '+0.4% vs last week', tone: 'positive' },
  { label: 'Fleet uptime', value: '98.3%', trend: '-0.3% vs target', tone: 'negative' },
  { label: 'Service backlog', value: '18 tickets', trend: '-5 this week', tone: 'positive' },
]

const throughput = [
  { day: 'Mon', orders: 120 },
  { day: 'Tue', orders: 138 },
  { day: 'Wed', orders: 152 },
  { day: 'Thu', orders: 148 },
  { day: 'Fri', orders: 175 },
  { day: 'Sat', orders: 164 },
  { day: 'Sun', orders: 142 },
]

const serviceAlerts = [
  { id: 'TX-24', label: 'Dallas DC', detail: '3 units waiting on battery service' },
  { id: 'IL-03', label: 'Chicago DC', detail: 'Dock 6 sensor fault detected' },
  { id: 'CA-11', label: 'Riverside DC', detail: 'Preventive maintenance due in 48h' },
]

export default function DashboardPage() {
  return (
    <div className="page">
      <PageHeader
        title="Operations Overview"
        subtitle="Snapshot of TMHNA network health and current workload"
        actions={
          <>
            <span className="badge">Updated 5m ago</span>
            <button type="button" className="btn">
              Export
            </button>
            <button type="button" className="btn btn-primary">
              New ticket
            </button>
          </>
        }
      />

      <div className="cards-grid">
        {statTiles.map((tile) => (
          <StatTile key={tile.label} {...tile} />
        ))}
      </div>

      <SectionCard
        title="Weekly throughput"
        actions={<button className="btn">View report</button>}
        footer="Includes fulfillment from all TMHNA distribution centers"
      >
        <div className="chart-shell">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={throughput} margin={{ top: 14, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Tooltip cursor={{ stroke: '#c0001b', strokeDasharray: '4 2' }} />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#c0001b"
                fill="rgba(192, 0, 27, 0.14)"
                strokeWidth={2.4}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Service alerts" footer="Prioritized by impact and location">
        <ul className="list">
          {serviceAlerts.map((alert) => (
            <li key={alert.id} className="list-item">
              <span>
                {alert.label} · {alert.detail}
              </span>
              <span>{alert.id}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
