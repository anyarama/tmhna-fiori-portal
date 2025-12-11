const toneClass = {
  positive: '',
  neutral: 'neutral',
  negative: 'negative',
}

export function StatTile({ label, value, trend, tone = 'positive' }) {
  const trendClass = toneClass[tone] ?? toneClass.positive

  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <div className="stat-value">{value}</div>
      {trend ? <div className={`stat-trend ${trendClass}`}>{trend}</div> : null}
    </div>
  )
}
