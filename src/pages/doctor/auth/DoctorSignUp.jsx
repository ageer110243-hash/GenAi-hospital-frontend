
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, Mail, Lock, Phone, Stethoscope, BadgeCheck, Calendar, Briefcase, Users,
  CalendarCheck, ClipboardList, ShieldCheck,
} from 'lucide-react'
import axios from 'axios'

// Same look as patient forms
const fieldClass =
  'w-full rounded-xl border border-navy-900/10 bg-ivory py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-navy-800/40 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'

const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-800/60'

const iconClass =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-600'

// Doctor benefits
const perks = [
  { icon: CalendarCheck, text: 'Manage your appointments & schedule' },
  { icon: ClipboardList, text: 'Access patient records securely' },
  { icon: ShieldCheck, text: 'Profile verified by our admin team' },
]

// Specializations
const specializations = [
  { value: 'General Physician', label: 'General Physician' },
  { value: 'Dermatlogist', label: 'Dermatologist' },
  { value: 'Cardialogist', label: 'Cardiologist' },
  { value: 'ENT', label: 'ENT' },
  { value: 'Phychologist', label: 'Psychologist' },
  { value: 'Dentist', label: 'Dentist' },
]

// Gender
const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Femalle', label: 'Female' },
  { value: 'Others', label: 'Other' },
]

const DoctorSignUp = () => {

  const navigate = useNavigate()

  const [doctor, setDoctor] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    license: '',
    age: '',
    experience: '',
    gender: '',
  })

  // Handle input changes
  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    })
  }

  // Form submit -> API
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8000/api/doctor/register-doctor',
        doctor,
        { withCredentials: true }
      )

      console.log(response.data)
      navigate("/doctor-signup")
      

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">

      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-100 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-gold-300/30 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">

        {/* Left Section */}
        <div>

          <span className="eyebrow">
            Doctor registration
          </span>

          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-navy-900 sm:text-6xl">
            Join our team of
            <span className="block italic text-brand-600">
              trusted specialists.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-800/70">
            Create your doctor account to connect with patients,
            manage consultations and grow your practice with Aurelia.
          </p>

          <ul className="mt-10 space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 text-navy-800"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>

                {text}
              </li>
            ))}
          </ul>

        </div>

        {/* Form Card */}
        <div className="relative">

          {/* Gold ring */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-full w-full rounded-3xl border border-gold-500/50" />

          <div className="relative rounded-3xl border border-navy-900/5 bg-white p-6 shadow-2xl shadow-navy-900/10 sm:p-9">

            <h2 className="text-3xl font-semibold text-navy-900">
              Create your
              <span className="italic text-brand-600">
                {' '}doctor account
              </span>
            </h2>

            <p className="mt-1 text-sm text-navy-800/60">
              Your profile will be reviewed and approved by an admin.
            </p>

            <form
              className="mt-7 grid gap-5 sm:grid-cols-2"
              onSubmit={handleSubmit}
            >

              {/* Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>

                <div className="relative">
                  <User size={18} className={iconClass} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={doctor.name}
                    onChange={handleChange}
                    placeholder="Dr. John Doe"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>

                <div className="relative">
                  <Mail size={18} className={iconClass} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={doctor.email}
                    onChange={handleChange}
                    placeholder="doctor@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>

                <div className="relative">
                  <Phone size={18} className={iconClass} />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={doctor.phone}
                    onChange={handleChange}
                    placeholder="03001234567"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="sm:col-span-2">
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <Lock size={18} className={iconClass} />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={doctor.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label htmlFor="specialization" className={labelClass}>
                  Specialization
                </label>

                <div className="relative">
                  <Stethoscope size={18} className={iconClass} />

                  <select
                    id="specialization"
                    name="specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select specialization
                    </option>

                    {specializations.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* License */}
              <div>
                <label htmlFor="license" className={labelClass}>
                  License number
                </label>

                <div className="relative">
                  <BadgeCheck size={18} className={iconClass} />

                  <input
                    id="license"
                    type="text"
                    name="license"
                    value={doctor.license}
                    onChange={handleChange}
                    placeholder="PMDC-12345"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className={labelClass}>
                  Age
                </label>

                <div className="relative">
                  <Calendar size={18} className={iconClass} />

                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="0"
                    placeholder="35"
                    value={doctor.age}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label htmlFor="experience" className={labelClass}>
                  Experience (years)
                </label>

                <div className="relative">
                  <Briefcase size={18} className={iconClass} />

                  <input
                    id="experience"
                    type="number"
                    name="experience"
                    min="0"
                    placeholder="10"
                    value={doctor.experience}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="sm:col-span-2">
                <label htmlFor="gender" className={labelClass}>
                  Gender
                </label>

                <div className="relative">
                  <Users size={18} className={iconClass} />

                  <select
                    id="gender"
                    name="gender"
                    value={doctor.gender}
                    onChange={handleChange}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>

                    {genders.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Section */}
              <div className="sm:col-span-2">

                {/* Create Account */}
                <button
                  type="submit"
                  className="btn-primary w-full py-3.5"
                >
                  Create Account
                </button>

                {/* Doctor Login */}
                <p className="mt-5 text-center text-sm text-navy-800/60">
                  Already have an account?{' '}

                  <Link
                    to="/doctor-login"
                    className="font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Sign in
                  </Link>
                </p>

                {/* Patient Signup Button */}
                <div className="mt-5 border-t border-navy-900/10 pt-5">

                  <p className="mb-3 text-center text-sm text-navy-800/60">
                    Are you a patient?
                  </p>

                  <Link
                    to="/patient-signup"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-600 bg-white py-3.5 font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
                  >
                    <User size={19} />
                    Sign Up as Patient
                  </Link>

                </div>

              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  )
}

export default DoctorSignUp
