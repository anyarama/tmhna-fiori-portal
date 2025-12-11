import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader } from '../components/PageHeader.jsx'
import { ChartCard } from '../components/ChartCard.jsx'
import { CustomTooltip } from '../components/CustomTooltip.jsx'
import { revenueByBrand } from '../data/financialData.js'

export default function DealerAnalyticsPage() {
  const chartData = useMemo(() => {
    const brandData = revenueByBrand[2024].All
    return Object.entries(brandData).map(([name, value]) => ({
      name,
      revenue: value,
    }))
  }, [])

  return (
    <div className="page">
      <PageHeader
        title="Dealer Analytics Overview"
        subtitle="Surface dealer-level KPIs and performance insights. The current Proof of Concept reuses the same underlying financial data model."
      />

      <ChartCard
        title="Revenue by Brand (2024)"
        subtitle="Illustrative data from the unified financial model"
        footer="Data source: S/4HANA + Snowflake"
      >
        <div className="chart-container compact-chart">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sap-border)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="var(--sap-muted)"
                tick={{ fill: 'var(--sap-text)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--sap-border)' }}
              />
              <YAxis
                stroke="var(--sap-muted)"
                tick={{ fill: 'var(--sap-text)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--sap-border)' }}
                tickFormatter={(value) => `$${value.toFixed(1)}B`}
              />
              <Tooltip
                content={(props) => (
                  <CustomTooltip {...props} formatter={(value) => `$${value.toFixed(2)}B`} />
                )}
              />
              <Bar dataKey="revenue" fill="var(--sap-chart-color-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <p className="page-description">
        This page would typically feature detailed dealer performance metrics, regional comparisons, and
        drill-down capabilities. The current Proof of Concept reuses the same underlying financial data model.
      </p>
    </div>
  )
}

