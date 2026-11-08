import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Stethoscope, Users, CalendarCheck, UserCircle, LogOut, Menu, X, Bell, Search } from 'lucide-react'
import Logo from '../../../components/Logo'
import axios from 'axios'

// ---------- Admin dashboard settings ----------
const panelLabel = 'Admin panel'
const profileTo = '/admin-dashboard/profile' // top bar avatar opens this page

// Sidebar links
const links = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin-dashboard/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/admin-dashboard/patients', label: 'Patients', icon: Users },
  { to: '/admin-dashboard/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin-dashboard/profile', label: 'Profile', icon: UserCircle },
]

// Layout: sidebar + top bar. Child pages (./pages) render inside <Outlet />
const AdminDashboard = () => {
  const [open, setOpen] = useState(false) // mobile sidebar
  const [user, setUser] = useState({ name: 'Admin', role: 'Administrator' })

  const navigate = useNavigate()

  // get the logged-in admin
  const getAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/profile', {
        withCredentials: true,
      })
      console.log(response)

      const admin = response.data.admin || response.data.user
      if (admin) {
        setUser({ name: admin.name || 'Admin', role: 'Administrator' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAdmin()
  }, [])

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/admin/logout',
        {},
        { withCredentials: true }
      )

      localStorage.removeItem('role')
      navigate('/admin-login')
    } catch (error) {
      console.log('Logout Error:', error)
    }
  }

  return (
    <div className="font-dashboard min-h-screen bg-surface text-navy-900 lg:pl-72">
      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* ---------- Sidebar ---------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-navy-900/5 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <Logo />
          <button onClick={() => setOpen(false)} className="text-navy-800 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <p className="px-7 pb-2 pt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-800/40">
          {panelLabel}
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-navy-800/70 hover:bg-surface hover:text-navy-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute -left-4 h-6 w-1 rounded-r-full bg-gold-500" />}
                  <Icon size={18} /> {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* user card */}
        <div className="m-4 rounded-2xl bg-linear-to-br from-brand-700 to-navy-900 p-4 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-sm font-bold">
              {user.name?.[0]?.toUpperCase()}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-white/60">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-xs font-semibold transition hover:bg-white/20"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* ---------- Top bar ---------- */}
      <header className="sticky top-0 z-30 border-b border-navy-900/5 bg-surface/85 backdrop-blur-lg">
        <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-navy-900/10 bg-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden w-80 sm:block">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40" />
              <input
                placeholder="Search..."
                className="w-full rounded-xl border border-navy-900/10 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative grid h-11 w-11 place-items-center rounded-xl border border-navy-900/10 bg-white text-navy-800 transition hover:text-brand-700" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-gold-500 ring-2 ring-white" />
            </button>
            {/* avatar + name -> opens the profile page */}
            <Link
              to={profileTo}
              aria-label="Open profile"
              className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-white sm:pr-3"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-brand-800 font-bold text-white">
                {user.name?.[0]?.toUpperCase()}
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-navy-800/60">{user.role}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* ---------- Page content (child routes render here) ---------- */}
      <main className="p-5 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminDashboard