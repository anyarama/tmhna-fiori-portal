import { Navigate, useRoutes } from 'react-router-dom'
import DashboardPage from '../pages/Dashboard.jsx'
import FleetPage from '../pages/Fleet.jsx'
import OrdersPage from '../pages/Orders.jsx'
import ServicePage from '../pages/Service.jsx'
import SettingsPage from '../pages/Settings.jsx'

export function AppRoutes() {
  return useRoutes([
    { path: '/', element: <DashboardPage /> },
    { path: '/orders', element: <OrdersPage /> },
    { path: '/fleet', element: <FleetPage /> },
    { path: '/service', element: <ServicePage /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
