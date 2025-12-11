export function FilterBar({
  yearOptions,
  brandOptions,
  regionOptions,
  selectedYear,
  selectedBrand,
  selectedRegion,
  onYearChange,
  onBrandChange,
  onRegionChange,
  disableBrand = false,
  disableRegion = false,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Fiscal Year</label>
        <select
          className="filter-select"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {!disableBrand && (
        <div className="filter-group">
          <label className="filter-label">Brand</label>
          <select
            className="filter-select"
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
          >
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      )}
      {!disableRegion && (
        <div className="filter-group">
          <label className="filter-label">Region</label>
          <select
            className="filter-select"
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            {regionOptions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
