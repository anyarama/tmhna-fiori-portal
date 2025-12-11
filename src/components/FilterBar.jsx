export function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <div key={filter.key} className="filter-bar__item">
          <label className="filter-bar__label" htmlFor={`filter-${filter.key}`}>
            {filter.label}
          </label>
          <select
            id={`filter-${filter.key}`}
            className="filter-bar__select"
            value={filter.value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
          >
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

