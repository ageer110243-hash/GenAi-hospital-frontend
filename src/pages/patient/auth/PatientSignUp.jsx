import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, Mail, Phone, Lock, Stethoscope, Calendar, Droplet, Users, ShieldCheck, CalendarCheck, FileText,
} from 'lucide-react'
import axios from 'axios'

// Same look for every input / select (change once, applies everywhere)
const fieldClass =
  'w-full rounded-xl border border-navy-900/10 bg-ivory py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-navy-800/40 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-800/60'
const iconClass =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-600'

const perks = [
  { icon: CalendarCheck, text: 'Book appointments in minutes' },
  { icon: FileText, text: 'Access your reports anytime' },
  { icon: ShieldCheck, text: 'Your data stays private & secure' },
]

const PatientSignUp = () => {
  const navigate = useNavigate()
  const [patient, setPatient] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    disease: '',
    gender: '',
    age: '',
    bloodGroup: '',
  })

  // every input / select change
  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    })
  }

  // form submit -> API
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:8000/api/patient/register-patient',
        patient,
        { withCredentials: true }
      )
      console.log(response)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* same soft blobs as Hero */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-gold-300/30 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        {/* ---------- Left copy (same style as Hero) ---------- */}
        <div>
          <span className="eyebrow">Patient registration</span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-navy-900 sm:text-6xl">
            Your health journey
            <span className="block italic text-brand-600">starts here.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-800/70">
            Create your patient account to book appointments, view reports and stay connected with
            your doctors.
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
        <div className="relative">
          {/* gold ring like Hero visual */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-full w-full rounded-3xl border border-gold-500/50" />

          <div className="relative rounded-3xl border border-navy-900/5 bg-white p-6 shadow-2xl shadow-navy-900/10 sm:p-9">
            <h2 className="text-3xl font-semibold text-navy-900">
              Create your <span className="italic text-brand-600">account</span>
            </h2>
            <p className="mt-1 text-sm text-navy-800/60">Fill in your details to get started.</p>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
              {/* Full name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>Full name</label>
                <div className="relative">
                  <User size={18} className={iconClass} />
                  <input id="name" type="text" name="name" placeholder="John Doe" value={patient.name} onChange={handleChange} className={fieldClass} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <div className="relative">
                  <Mail size={18} className={iconClass} />
                  <input id="email" type="email" name="email" value={patient.email} onChange={handleChange} placeholder="you@example.com" className={fieldClass} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <div className="relative">
                  <Phone size={18} className={iconClass} />
                  <input id="phone" type="tel" name="phone" value={patient.phone} onChange={handleChange} placeholder="03001234567" className={fieldClass} />
                </div>
              </div>

              {/* Password */}
              <div className="sm:col-span-2">
                <label htmlFor="password" className={labelClass}>Password</label>
                <div className="relative">
                  <Lock size={18} className={iconClass} />
                  <input id="password" type="password" name="password" value={patient.password} onChange={handleChange} placeholder="Create a strong password" className={fieldClass} />
                </div>
              </div>

              {/* Gender (enum) - values must match the model: Male / Female / Other */}
              <div>
                <label htmlFor="gender" className={labelClass}>Gender</label>
                <div className="relative">
                  <Users size={18} className={iconClass} />
                  <select id="gender" name="gender" value={patient.gender} onChange={handleChange} className={`${fieldClass} appearance-none`}>
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className={labelClass}>Age</label>
                <div className="relative">
                  <Calendar size={18} className={iconClass} />
                  <input id="age" type="number" name="age" value={patient.age} onChange={handleChange} min="0" placeholder="25" className={fieldClass} />
                </div>
              </div>

              {/* Blood group (enum) */}
              <div>
                <label htmlFor="bloodGroup" className={labelClass}>Blood group</label>
                <div className="relative">
                  <Droplet size={18} className={iconClass} />
                  <select id="bloodGroup" name="bloodGroup" value={patient.bloodGroup} onChange={handleChange} className={`${fieldClass} appearance-none`}>
                    <option value="" disabled>Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* Disease */}
              <div>
                <label htmlFor="disease" className={labelClass}>Disease / Condition</label>
                <div className="relative">
                  <Stethoscope size={18} className={iconClass} />
                  <input id="disease" type="text" name="disease" value={patient.disease} onChange={handleChange} placeholder="e.g. Diabetes" className={fieldClass} />
                </div>
              </div>

              {/* Submit */}
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full py-3.5">
                  Create Account
                </button>
                <p className="mt-5 text-center text-sm text-navy-800/60">
                  Already have an account?{' '}
                  <Link to="/patient-login" className="font-semibold text-brand-700 hover:text-brand-800">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PatientSignUp
