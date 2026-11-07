import { Link } from 'react-router-dom'
import { CalendarCheck, History, FileText, Pill, CalendarPlus, Clock, ArrowRight } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import StatCard from '../../../components/dashboard/StatCard'

const PatientOverview = () => (
  <>
    <PageHeader title="Welcome back, Fatima 👋" subtitle="Here is a summary of your health activity." />

    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={CalendarCheck} label="Upcoming" value="2" note="Next: 28 Oct" />
      <StatCard icon={History} label="Past visits" value="14" tone="navy" />
      <StatCard icon={FileText} label="Reports" value="6" tone="gold" />
      <StatCard icon={Pill} label="Prescriptions" value="3" tone="teal" />
    </div>

    <div className="mt-8 grid gap-6 xl:grid-cols-3">
      {/* next appointment */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-700 via-brand-800 to-navy-900 p-8 text-white shadow-xl shadow-brand-900/20 xl:col-span-2">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-400/30" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">Next appointment</p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Dr. Ayesha Khan</h2>
        <p className="text-white/70">Cardiologist</p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2"><CalendarCheck size={16} className="text-gold-300" /> 28 Oct 2026</span>
          <span className="flex items-center gap-2"><Clock size={16} className="text-gold-300" /> 10:30 AM</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-gold-400">Reschedule</button>
          <button className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold transition hover:bg-white/10">Cancel</button>
        </div>
      </div>

      {/* quick actions */}
      <div className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold">Quick actions</h2>
        <div className="mt-4 space-y-3">
          {[
            { to: '/patient-dashboard/book-appointment', icon: CalendarPlus, label: 'Book an appointment' },
            { to: '/patient-dashboard/previous-appointments', icon: History, label: 'View past appointments' },
            { to: '/patient-dashboard/reports', icon: FileText, label: 'Download reports' },
          ].map(({ to, icon: Icon, label }) => (
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

export default PatientOverview
