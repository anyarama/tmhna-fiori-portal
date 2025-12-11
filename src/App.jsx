import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import LaunchpadPage from './pages/LaunchpadPage.jsx'
import FinancialDashboardPage from './pages/FinancialDashboardPage.jsx'
import DealerAnalyticsPage from './pages/DealerAnalyticsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/launchpad" element={<LaunchpadPage />} />
          <Route path="/dashboard" element={<FinancialDashboardPage />} />
          <Route path="/dealer-analytics" element={<DealerAnalyticsPage />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/launchpad" replace />} />
      <Route path="*" element={<Navigate to="/launchpad" replace />} />
    </Routes>
  )
}

export default App
