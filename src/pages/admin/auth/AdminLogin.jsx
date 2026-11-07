import { Mail, Lock, ShieldCheck, Users, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import RoleSwitch from '../../../components/RoleSwitch'

// Same look as the doctor / patient forms
const fieldClass =
  'w-full rounded-xl border border-navy-900/10 bg-ivory py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-navy-800/40 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-800/60'
const iconClass =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-600'

const perks = [
  { icon: Users, text: 'Approve doctors & manage patients' },
  { icon: BarChart3, text: 'Monitor appointments and activity' },
  { icon: ShieldCheck, text: 'Restricted, secure administrator access' },
]




const AdminLogin = () => {


  
   const navigate = useNavigate()
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  })

  // every input / select change
  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    })
  }

  // form submit -> API
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:8000/api/admin/login',
        admin,
        { withCredentials: true }
      )
      localStorage.setItem('role', 'admin')
      navigate("/admin-dashboard")

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-gold-300/30 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        {/* ---------- Left copy ---------- */}
        <div>
          <span className="eyebrow">Admin login</span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-navy-900 sm:text-6xl">
            Welcome back,
            <span className="block italic text-brand-600">Administrator.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-800/70">
            Sign in to manage doctors, patients and appointments across the hospital.
          </p>

          <ul className="mt-10 space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-navy-800">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Form card ---------- */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="pointer-events-none absolute -right-4 -top-4 h-full w-full rounded-3xl border border-gold-500/50" />

          <div className="relative rounded-3xl border border-navy-900/5 bg-white p-6 shadow-2xl shadow-navy-900/10 sm:p-9">
            {/* choose who is logging in: patient / doctor / admin */}
            <RoleSwitch current="admin" />

            <h2 className="text-3xl font-semibold text-navy-900">
              Sign in to your <span className="italic text-brand-600">account</span>
            </h2>
            <p className="mt-1 text-sm text-navy-800/60">Enter your email and password to continue.</p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <div className="relative">
                  <Mail size={18} className={iconClass} />
                  <input id="email" type="email" name="email" value={admin.email} onChange={handleChange} placeholder="admin@example.com" className={fieldClass} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>Password</label>
                <div className="relative">
                  <Lock size={18} className={iconClass} />
                  <input id="password" type="password" name="password" value={admin.password} onChange={handleChange} placeholder="Enter your password" className={fieldClass} />
                </div>
              </div>

              <div className="text-right text-sm">
                <a href="#" className="font-semibold text-brand-700 hover:text-brand-800">Forgot password?</a>
              </div>

              <button type="submit" className="btn-primary w-full py-3.5">
                Sign In
              </button>

              <p className="text-center text-sm text-navy-800/60">
                New administrator?{' '}
                <Link to="/admin-signup" className="font-semibold text-brand-700 hover:text-brand-800">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin