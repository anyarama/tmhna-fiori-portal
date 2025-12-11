export function KpiCard({ label, value, unit, change, changeLabel, helper }) {
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

  const changeClass = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'

  return (
    <div className="kpi-card">
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__value">
        {formatValue()}
      </div>
      {helper && (
        <div className="kpi-card__helper" style={{ fontSize: '12px', color: 'var(--sap-text-muted)', marginTop: '4px' }}>
          {helper}
        </div>
      )}
      <div className={`kpi-card__delta kpi-card__delta--${changeClass}`}>
        <span className="kpi-card__delta-value">{formatChange()}</span>
        <span className="kpi-card__delta-label">{changeLabel}</span>
      </div>
    </div>
  )
}
