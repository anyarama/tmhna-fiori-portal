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
          <Link to="/launchpad" className="shell-logo">
            <img src={sapLogo} alt="SAP" className="sap-logo" />
            <span className="app-title">TMHNA Financial Intelligence Portal</span>
          </Link>

          <nav className="shell-nav">
            <NavLink
              to="/launchpad"
              end
              className={({ isActive }) =>
                isActive ? 'shell-nav__item shell-nav__item--active' : 'shell-nav__item'
              }
            >
              My Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'shell-nav__item shell-nav__item--active' : 'shell-nav__item'
              }
            >
              Financial Dashboards
            </NavLink>
            <NavLink
              to="/dealer-analytics"
              className={({ isActive }) =>
                isActive ? 'shell-nav__item shell-nav__item--active' : 'shell-nav__item'
              }
            >
              Dealer Analytics
            </NavLink>
          </nav>
        </div>

        <div className="shell-bar__center">
          <div className="global-search">
            <input
              type="search"
              placeholder="Search across TMHNA financial content"
              className="global-search__input"
              aria-label="Global search"
            />
          </div>
        </div>

        <div className="shell-bar__right">
          <button className="shell-icon-button" type="button" aria-label="Notifications">
            <span className="icon-bell" />
          </button>
          <button className="shell-icon-button" type="button" aria-label="Help">
            <span className="icon-help" />
          </button>
          <div className="user-menu" ref={userMenuRef}>
            <button
              className="user-chip user-chip--clickable"
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <div className="user-avatar">E</div>
              <div className="user-meta">
                <div className="user-name">Emma Johnson</div>
                <div className="user-role">TMHNA Finance</div>
              </div>
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
                  <div className="user-avatar user-avatar--large">E</div>
                  <div className="user-menu__info">
                    <div className="user-menu__name">Emma Johnson</div>
                    <div className="user-menu__email">emma.johnson@tmhna.com</div>
                  </div>
                </div>
                <div className="user-menu__divider" />
                <button
                  type="button"
                  className="user-menu__item"
                  onClick={() => {
                    setUserMenuOpen(false)
                    // Navigate to profile page if exists
                  }}
                >
                  <span>My Profile</span>
                </button>
                <button
                  type="button"
                  className="user-menu__item"
                  onClick={() => {
                    setUserMenuOpen(false)
                    // Navigate to settings page if exists
                  }}
                >
                  <span>Settings</span>
                </button>
                <button
                  type="button"
                  className="user-menu__item"
                  onClick={() => {
                    setUserMenuOpen(false)
                    // Navigate to preferences page if exists
                  }}
                >
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

      <main className="app-layout__content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
