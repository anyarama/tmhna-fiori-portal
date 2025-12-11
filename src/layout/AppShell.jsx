import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Orders', to: '/orders' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Service', to: '/service' },
  { label: 'Settings', to: '/settings' },
]

export function AppShell({ children }) {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand" aria-label="Toyota Material Handling North America">
          <span className="brand-mark" aria-hidden />
          <span>TMHNA</span>
          <span className="brand-subtitle">Fiori Portal</span>
        </div>
        <div className="top-actions">
          <span className="badge">Live snapshot</span>
          <button type="button" className="btn btn-primary">
            New request
          </button>
        </div>
      </header>

      <nav className="side-nav" aria-label="Primary navigation">
        <div className="nav-label">Navigation</div>
        <div className="nav-group">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="main-content">{children}</main>
    </div>
  )
}
