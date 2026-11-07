import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, History, FileText, Pill, CalendarPlus, Clock, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'

// Dummy data (remove when the API is connected)
const dummyOverview = {
  stats: { upcoming: 2, pastVisits: 14, reports: 6, prescriptions: 3 },
  nextAppointment: { doctor: 'Dr. Ayesha Khan', specialization: 'Cardiologist', date: '28 Oct 2026', time: '10:30 AM' },
}

// options for the Book Appointment form


const quickActions = [
  { to: '/patient-dashboard/book-appointment', icon: CalendarPlus, label: 'Book an appointment' },
  { to: '/patient-dashboard/previous-appointments', icon: History, label: 'View past appointments' },
  { to: '/patient-dashboard/reports', icon: FileText, label: 'Download reports' },
]

const PatientOverview = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(dummyOverview) // dummy data for now

  // TODO(API): replace the dummy data with a real request.
  // (add `import axios from 'axios'` and useEffect to the react import)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get('http://localhost:8000/api/patient/overview', { withCredentials: true })
  //     setData(data)
  //   }
  //   fetchData()
  // }, [])


  const { stats, nextAppointment } = data

  return (
    <>
      <PageHeader title="Welcome back" subtitle="Here is a summary of your health activity." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Upcoming" value={stats.upcoming} note="Next: 28 Oct" />
        <StatCard icon={History} label="Past visits" value={stats.pastVisits} tone="navy" />
        <StatCard icon={FileText} label="Reports" value={stats.reports} tone="gold" />
        <StatCard icon={Pill} label="Prescriptions" value={stats.prescriptions} tone="teal" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* next appointment */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-700 via-brand-800 to-navy-900 p-8 text-white shadow-xl shadow-brand-900/20 xl:col-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-400/30" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">Next appointment</p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{nextAppointment.doctor}</h2>
          <p className="text-white/70">{nextAppointment.specialization}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2"><CalendarCheck size={16} className="text-gold-300" /> {nextAppointment.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-gold-300" /> {nextAppointment.time}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {/* TODO(API): onClick -> reschedule */}
            <button className="rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-gold-400">Reschedule</button>
            {/* TODO(API): onClick -> cancel */}
            <button className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold transition hover:bg-white/10">Cancel</button>
          </div>
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
