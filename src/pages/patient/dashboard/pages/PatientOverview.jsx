import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, CalendarDays, CheckCircle2, Clock, XCircle, CalendarPlus, History, FileText, ArrowRight } from 'lucide-react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'

const quickActions = [
  { to: '/patient-dashboard/book-appointment', icon: CalendarPlus, label: 'Book an appointment' },
  { to: '/patient-dashboard/previous-appointments', icon: History, label: 'View my appointments' },
  { to: '/patient-dashboard/reports', icon: FileText, label: 'Medical reports' },
]

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

const todayISO = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD

const PatientOverview = () => {
  const [appointments, setAppointments] = useState([])
  const [patient, setPatient] = useState(null)

  const getData = async () => {
    try {
      const [appointmentsRes, profileRes] = await Promise.all([
        axios.get('http://localhost:8000/api/appointment/patient', { withCredentials: true }),
        axios.get('http://localhost:8000/api/patient/profile', { withCredentials: true }),
      ])
      setAppointments(appointmentsRes.data.appointments)
      setPatient(profileRes.data.patient)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const cancelAppointment = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    try {
      await axios.put(`http://localhost:8000/api/appointment/cancle/${id}`, {}, { withCredentials: true })
      getData()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  // upcoming = waiting or approved, and today or later (the API sends the earliest first)
  const upcoming = appointments.filter(
    (a) => (a.status === 'Pending' || a.status === 'Approved') && String(a.appointmentDate).slice(0, 10) >= todayISO
  )
  const next = upcoming[0]
  const count = (status) => appointments.filter((a) => a.status === status).length

  return (
    <>
      <PageHeader
        title={patient ? `Welcome back, ${patient.name}` : 'Welcome back'}
        subtitle="Here is a summary of your appointments."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarDays}
          label="Total appointments"
          value={appointments.length}
          tone="navy"
          note={`${count('Completed')} completed · ${count('Cancelled')} cancelled`}
        />
        <StatCard icon={CheckCircle2} label="Approved" value={count('Approved')} tone="teal" note="Confirmed by the doctor" />
        <StatCard icon={Clock} label="Pending" value={count('Pending')} tone="gold" note="Waiting for the doctor" />
        <StatCard icon={XCircle} label="Rejected" value={count('Rejected')} tone="red" note="Declined by the doctor" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* next appointment */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-700 via-brand-800 to-navy-900 p-8 text-white shadow-xl shadow-brand-900/20 xl:col-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-400/30" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">Next appointment</p>

          {next ? (
            <>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{next.doctor?.name || 'Unknown doctor'}</h2>
              <p className="text-white/70">{next.department || next.doctor?.specialization}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2"><CalendarCheck size={16} className="text-gold-300" /> {formatDate(next.appointmentDate)}</span>
                <span className="flex items-center gap-2"><Clock size={16} className="text-gold-300" /> {next.time || '—'}</span>
                <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold">{next.status}</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => cancelAppointment(next._id)}
                  className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
                >
                  Cancel appointment
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">No upcoming appointment</h2>
              <p className="mt-2 text-white/70">Book a visit with one of our doctors.</p>
              <Link to="/patient-dashboard/book-appointment" className="mt-8 inline-flex rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-gold-400">
                Book an appointment
              </Link>
            </>
          )}
        </div>

        {/* quick actions */}
        <div className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Quick actions</h2>
          <div className="mt-4 space-y-3">
            {quickActions.map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} className="group flex items-center justify-between rounded-xl bg-surface p-4 text-sm font-semibold transition hover:bg-brand-50 hover:text-brand-700">
                <span className="flex items-center gap-3"><Icon size={18} className="text-brand-600" /> {label}</span>
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientOverview