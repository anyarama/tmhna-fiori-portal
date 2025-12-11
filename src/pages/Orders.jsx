import { PageHeader } from '../components/PageHeader.jsx'
import { SectionCard } from '../components/SectionCard.jsx'

const openOrders = [
  { id: 'SO-10421', customer: 'PepsiCo', status: 'Picking', eta: 'Today · 4:30p' },
  { id: 'SO-10418', customer: 'Ford Motor', status: 'Loading', eta: 'Today · 6:00p' },
  { id: 'SO-10415', customer: 'Amazon ONT8', status: 'In transit', eta: 'Tomorrow · 9:00a' },
]

export default function OrdersPage() {
  return (
    <div className="page">
      <PageHeader
        title="Orders"
        subtitle="Monitor customer fulfillment and delivery status"
        actions={<button className="btn">Create order</button>}
      />

      <SectionCard title="Open orders" footer="Auto-sorted by promised delivery window">
        <ul className="list">
          {openOrders.map((order) => (
            <li key={order.id} className="list-item">
              <span>
                {order.id} · {order.customer}
              </span>
              <span>
                {order.status} — {order.eta}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
