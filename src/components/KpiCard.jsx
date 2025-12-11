export function KpiCard({ label, value, change, unit, changeLabel }) {
  const formatValue = () => {
    if (unit === 'B') {
      return `$${value.toFixed(1)}${unit}`
    }
    if (unit === '%') {
      return `${value.toFixed(1)}${unit}`
    }
    if (unit === 'days') {
      return `${value} ${unit}`
    }
    return `${value}${unit || ''}`
  }

  const formatChange = () => {
    if (change > 0) {
      return `+${change.toFixed(1)}`
    }
    return `${change.toFixed(1)}`
  }

  const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral'

  return (
    <div className="kpi-card">
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__value">{formatValue()}</div>
      <div className={`kpi-card__trend kpi-card__trend--${changeClass}`}>
        {formatChange()} {changeLabel}
      </div>
    </div>
  )
}

