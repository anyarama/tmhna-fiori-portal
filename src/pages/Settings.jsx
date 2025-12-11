import { PageHeader } from '../components/PageHeader.jsx'
import { SectionCard } from '../components/SectionCard.jsx'

export default function SettingsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Settings"
        subtitle="Environment toggles for the TMHNA Fiori portal"
        actions={<button className="btn">Edit tenants</button>}
      />

      <SectionCard title="Configuration">
        <ul className="list">
          <li className="list-item">
            <span>Theme</span>
            <span>TMHNA · Light</span>
          </li>
          <li className="list-item">
            <span>Data source</span>
            <span>Sandbox (mock)</span>
          </li>
          <li className="list-item">
            <span>Notifications</span>
            <span>Enabled</span>
          </li>
        </ul>
      </SectionCard>
    </div>
  )
}
