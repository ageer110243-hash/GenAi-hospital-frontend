import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS, SITE } from '../data/site'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Authentication Check (Aap ke auth logic ke hisab se token check hoga)
  const checkIsAuthenticated = () => {
    return Boolean(localStorage.getItem('token'))
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Protected Navigation for Appointment Button
  const handleBookAppointment = () => {
    setOpen(false) // Mobile menu drop-down close karne ke liye
    const isAuthenticated = checkIsAuthenticated()

    if (isAuthenticated) {
      // Agar logged in hai, appointment flow / section par jaye
      navigate('/#appointment')
    } else {
      // Agar logged in nahi hai, to Direct Login Page par redirect hoga
      navigate('/patient-login', { state: { redirect: '/#appointment' } })
    }
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden bg-navy-950 text-xs text-white/80 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-gold-400" /> {SITE.hours}
            </span>
            <span>{SITE.address}</span>
          </div>
          <a
            href={`tel:${SITE.emergency}`}
            className="flex items-center gap-2 font-semibold text-gold-300 hover:text-gold-400"
          >
            <Phone size={14} /> Emergency: {SITE.emergency}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/90 shadow-[0_8px_30px_-12px_rgba(11,34,57,0.25)] backdrop-blur-lg'
            : 'bg-ivory'
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />

          {/* Navigation Links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="group relative text-sm font-medium text-navy-800 transition hover:text-brand-700"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to="/patient-signup"
              className="text-sm font-semibold text-navy-800 hover:text-brand-700"
            >
              Sign up
            </Link>
            
            <Link
              to="/patient-login"
              className="text-sm font-semibold text-navy-800 hover:text-brand-700"
            >
              Login
            </Link>

            <button
              type="button"
              onClick={handleBookAppointment}
              className="btn-primary"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-navy-900/10 text-navy-900 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-navy-900/10 bg-ivory lg:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-navy-800 hover:bg-brand-50 hover:text-brand-700"
                >
                  {l.label}
                </Link>
              ))}

              <Link
                to="/patient-signup"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-navy-800 hover:bg-brand-50 hover:text-brand-700"
              >
                Sign up
              </Link>

              <Link
                to="/patient-login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-navy-800 hover:bg-brand-50 hover:text-brand-700"
              >
                Login
              </Link>

              <button
                type="button"
                onClick={handleBookAppointment}
                className="btn-primary mt-3 w-full text-center"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar