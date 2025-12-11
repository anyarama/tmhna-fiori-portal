import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import sapLogo from '../assets/sap-logo.png'

export function AppLayout() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-layout">
      <header className="shell-bar">
        <div className="shell-bar__left">
          <Link to="/launchpad" className="app-title" aria-label="SAP Home">
            <img src={sapLogo} alt="SAP Logo" className="app-title__logo" />
          </Link>
        </div>
        <div className="shell-bar__center">
          <div className="global-search">
            <input
              type="search"
              placeholder="Search..."
              className="global-search__input"
              aria-label="Global search"
            />
          </div>
        </div>
        <div className="shell-bar__right">
          <div className="user-menu" ref={userMenuRef}>
            <button
              type="button"
              className="user-menu__trigger"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <div className="user-avatar">
                <span className="user-avatar__initials">JD</span>
              </div>
              <span className="user-name">John Doe</span>
              <svg
                className="user-menu__arrow"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {userMenuOpen && (
              <div className="user-menu__dropdown">
                <div className="user-menu__header">
                  <div className="user-avatar user-avatar--large">
                    <span className="user-avatar__initials">JD</span>
                  </div>
                  <div className="user-menu__info">
                    <div className="user-menu__name">John Doe</div>
                    <div className="user-menu__email">john.doe@tmhna.com</div>
                  </div>
                </div>
                <div className="user-menu__divider" />
                <button type="button" className="user-menu__item" onClick={() => setUserMenuOpen(false)}>
                  <span>My Profile</span>
                </button>
                <button type="button" className="user-menu__item" onClick={() => setUserMenuOpen(false)}>
                  <span>Settings</span>
                </button>
                <button type="button" className="user-menu__item" onClick={() => setUserMenuOpen(false)}>
                  <span>Preferences</span>
                </button>
                <div className="user-menu__divider" />
                <button type="button" className="user-menu__item user-menu__item--danger" onClick={handleLogout}>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global navigation tabs (Fiori shell tab row) */}
      <nav className="shell-tabs" aria-label="Global navigation">
        <NavLink
          to="/launchpad"
          className={({ isActive }) =>
            `shell-tabs__item ${isActive ? 'shell-tabs__item--active' : ''}`
          }
        >
          My Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `shell-tabs__item ${isActive ? 'shell-tabs__item--active' : ''}`
          }
        >
          Financial Dashboards
        </NavLink>
        <NavLink
          to="/dealer-analytics"
          className={({ isActive }) =>
            `shell-tabs__item ${isActive ? 'shell-tabs__item--active' : ''}`
          }
        >
          Dealer Analytics
        </NavLink>
      </nav>

      <main className="app-layout__content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
