export function CustomTooltip({ active, payload, label, formatter }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {label && <div className="custom-tooltip__label">{label}</div>}
        {payload.map((entry, index) => (
          <div key={index} className="custom-tooltip__item">
            <div className="custom-tooltip__indicator" style={{ backgroundColor: entry.color }} />
            <span className="custom-tooltip__name">{entry.name || entry.dataKey || 'Value'}:</span>
            <span className="custom-tooltip__value">
              {formatter ? formatter(entry.value, entry.name, entry) : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

