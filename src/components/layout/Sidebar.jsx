import { useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Video,
  ClipboardCheck,
  BarChart3,
  Users,
  Settings,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/builder', icon: ClipboardCheck, label: 'Interview Builder' },
  { to: '/scheduling', icon: CalendarDays, label: 'Scheduling' },
  { to: '/interview', icon: Video, label: 'Live Interview' },
  { to: '/review', icon: ClipboardCheck, label: 'Post-Interview' },
  { to: '/scorecard', icon: BarChart3, label: 'Scorecard' },
  { to: '/candidates', icon: Users, label: 'Candidates' },
]

export default function Sidebar() {
  const location = useLocation()
  const { theme, toggle } = useTheme()

  return (
    <nav className="sidebar" aria-label="Main navigation">
      {/* Logo */}
      <div className="flex items-center gap-12 px-20 py-16 border-b border-[var(--color-sidebar-border)]">
        <div className="flex items-center justify-center w-24 h-24 rounded-md bg-[var(--color-primary)] text-[var(--color-primary-fg)] font-semibold text-[var(--font-size-md)] flex-shrink-0">
          S
        </div>
        <span className="sidebar-label font-semibold text-[var(--color-sidebar-fg-active)] text-[var(--font-size-md)]">
          Sinta
        </span>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 py-12 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
            >
              <Icon className="sidebar-icon" strokeWidth={1.75} />
              <span className="sidebar-label">{label}</span>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--color-sidebar-border)] py-8">
        <Link to="/settings" className="sidebar-item">
          <Settings className="sidebar-icon" strokeWidth={1.75} />
          <span className="sidebar-label">Settings</span>
        </Link>
        <button onClick={toggle} className="sidebar-item">
          {theme === 'dark' ? (
            <Sun className="sidebar-icon" strokeWidth={1.75} />
          ) : (
            <Moon className="sidebar-icon" strokeWidth={1.75} />
          )}
          <span className="sidebar-label">
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
        </button>
      </div>
    </nav>
  )
}
