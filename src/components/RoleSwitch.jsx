import { Link } from 'react-router-dom'
import { ShieldCheck, Stethoscope, User } from 'lucide-react'

const roles = [
  { key: 'patient', label: 'Patient', to: '/patient-login', icon: User },
  { key: 'doctor', label: 'Doctor', to: '/doctor-login', icon: Stethoscope },
  { key: 'admin', label: 'Admin', to: '/admin-login', icon: ShieldCheck },
]

// "Login as" switch. current = 'patient' | 'doctor' | 'admin' (the page you are on)
const RoleSwitch = ({ current }) => (
  <div className="mb-7">
    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-800/60">Login as</p>
    <div className="grid grid-cols-3 gap-1 rounded-full bg-ivory p-1 ring-1 ring-navy-900/10">
      {roles.map(({ key, label, to, icon: Icon }) => (
        <Link
          key={key}
          to={to}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${
            current === key
              ? 'bg-brand-700 text-white shadow-md shadow-brand-900/20'
              : 'text-navy-800/70 hover:text-brand-700'
          }`}
        >
          <Icon size={15} /> {label}
        </Link>
      ))}
    </div>
  </div>
)

export default RoleSwitch