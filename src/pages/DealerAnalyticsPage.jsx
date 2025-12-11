import { useMemo, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { revenueByBrand, fiscalYears } from '../data/financialData.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { FilterBar } from '../components/FilterBar.jsx'
import { compactTooltip } from '../lib/charts.js'

export default function DealerAnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState(Math.max(...fiscalYears))

  const brandRevenue = useMemo(() => {
    const yearData = revenueByBrand[selectedYear]
    if (!yearData || !yearData.All) return []
    const { All } = yearData
    return Object.entries(All).map(([brandName, value]) => ({
      brand: brandName,
      revenue: value,
    }))
  }, [selectedYear])

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dealer Analytics Overview"
        subtitle="This page reuses the same unified financial data model and would eventually drill into dealer-level profitability, backlog risk, and service KPIs across TMH, Raymond, and THD"
      />

      <FilterBar
        yearOptions={fiscalYears}
        brandOptions={['All']}
        regionOptions={['All']}
        selectedYear={selectedYear}
        selectedBrand="All"
        selectedRegion="All"
        onYearChange={setSelectedYear}
        onBrandChange={() => {}}
        onRegionChange={() => {}}
        disableBrand
        disableRegion
      />

      <div className="chart-grid chart-grid--single">
        <div className="chart-card">
          <div className="chart-card__header">
            <div>
              <h3 className="chart-card__title">
                Revenue by Brand (Dealers, {selectedYear} – illustrative)
              </h3>
              <p className="chart-card__subtitle">
                Dealer revenue mix across TMH, Raymond, and THD using the unified financial data
                model
              </p>
            </div>
          </div>
          <div className="chart-card__body">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={brandRevenue} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border-subtle)" />
                <XAxis 
                  dataKey="brand" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `$${(value / 1000).toFixed(1)}B`
                    }
                    return `$${value.toFixed(0)}M`
                  }}
                />
                <Tooltip
                  contentStyle={compactTooltip}
                  formatter={(v) => {
                    const numValue = Number(v)
                    if (numValue >= 1000) {
                      return `$${(numValue / 1000).toFixed(1)}B`
                    }
                    return `$${numValue.toFixed(1)}M`
                  }}
                />
                <Bar dataKey="revenue" fill="var(--sap-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <p className="page-footnote">
        In the full solution, this view would drill down from brand-level revenue into dealer-level
        profitability, backlog risk, and service utilization, all powered by the same integrated
        financial data model demonstrated in the main dashboard.
      </p>
    </div>
  )
}
