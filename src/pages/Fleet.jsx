import { PageHeader } from '../components/PageHeader.jsx'
import { SectionCard } from '../components/SectionCard.jsx'

const fleetStatus = [
  { site: 'Dallas DC', ready: '96%', note: '3 units charging · 1 pending battery swap' },
  { site: 'Chicago DC', ready: '94%', note: 'Planned PM overnight' },
  { site: 'Riverside DC', ready: '98%', note: 'No open faults' },
]

export default function FleetPage() {
  return (
    <div className="page">
      <PageHeader
        title="Fleet"
        subtitle="Telemetry and readiness across TMHNA sites"
        actions={<button className="btn">Fleet console</button>}
      />

      <SectionCard title="Readiness by site" footer="Sources: telematics, WMS, and maintenance systems">
        <ul className="list">
          {fleetStatus.map((site) => (
            <li key={site.site} className="list-item">
              <span>{site.site}</span>
              <span>
                {site.ready} ready — {site.note}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
