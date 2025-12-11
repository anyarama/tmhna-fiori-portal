import { PageHeader } from '../components/PageHeader.jsx'
import { SectionCard } from '../components/SectionCard.jsx'

const tickets = [
  { id: 'SR-8892', site: 'Dallas DC', status: 'Dispatch scheduled', eta: 'Today · 3:00p' },
  { id: 'SR-8887', site: 'Chicago DC', status: 'Awaiting parts', eta: 'Tomorrow · 10:00a' },
  { id: 'SR-8881', site: 'Riverside DC', status: 'Technician on site', eta: 'In progress' },
]

export default function ServicePage() {
  return (
    <div className="page">
      <PageHeader
        title="Service"
        subtitle="Current tickets and maintenance windows"
        actions={<button className="btn">Schedule PM</button>}
      />

      <SectionCard title="Active tickets" footer="Synced from SAP S/4HANA and field service">
        <ul className="list">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="list-item">
              <span>
                {ticket.id} · {ticket.site}
              </span>
              <span>
                {ticket.status} — {ticket.eta}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
