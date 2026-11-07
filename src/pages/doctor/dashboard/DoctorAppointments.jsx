import { useState } from 'react'
import { Calendar, Clock, Phone, Droplet, CheckCircle2, XCircle } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import StatusBadge from '../../../components/dashboard/StatusBadge'
import UserCell from '../../../components/dashboard/UserCell'

const appointments = [
  { id: 1, patient: 'Fatima Noor', age: 28, bloodGroup: 'O+', phone: '0300 1234567', date: '26 Oct 2026', time: '10:30 AM', reason: 'Chest pain and shortness of breath since 3 days.', status: 'Confirmed' },
  { id: 2, patient: 'Bilal Hussain', age: 45, bloodGroup: 'A+', phone: '0311 7654321', date: '26 Oct 2026', time: '11:15 AM', reason: 'Follow-up for blood pressure medication.', status: 'Pending' },
  { id: 3, patient: 'Mariam Ali', age: 8, bloodGroup: 'B+', phone: '0322 1112223', date: '26 Oct 2026', time: '12:00 PM', reason: 'Routine heart check-up.', status: 'Completed' },
  { id: 4, patient: 'Hassan Raza', age: 52, bloodGroup: 'AB-', phone: '0333 4445556', date: '27 Oct 2026', time: '01:30 PM', reason: 'ECG report review.', status: 'Cancelled' },
]

const DoctorAppointments = () => {
  const [selected, setSelected] = useState(appointments[0]) // UI only: highlights the clicked card

  return (
    <>
      <PageHeader title="Appointment details" subtitle="Select an appointment to see the full details." />

      <div className="grid gap-6 xl:grid-cols-5">
        {/* list */}
        <div className="space-y-3 xl:col-span-2">
          {appointments.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/5 ${
                selected.id === a.id ? 'border-brand-500 ring-2 ring-brand-200' : 'border-navy-900/5'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <UserCell name={a.patient} sub={`${a.date} · ${a.time}`} />
                <StatusBadge status={a.status} />
              </div>
            </button>
          ))}
        </div>

        {/* details */}
        <div className="h-fit rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm sm:p-8 xl:col-span-3">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-navy-800 text-2xl font-extrabold text-white">
                {selected.patient[0]}
              </span>
              <div>
                <h2 className="text-xl font-bold">{selected.patient}</h2>
                <p className="text-sm text-navy-800/60">{selected.age} years old</p>
              </div>
            </div>
            <StatusBadge status={selected.status} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Calendar, label: 'Date', value: selected.date },
              { icon: Clock, label: 'Time', value: selected.time },
              { icon: Phone, label: 'Phone', value: selected.phone },
              { icon: Droplet, label: 'Blood group', value: selected.bloodGroup },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-surface p-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-brand-600"><Icon size={18} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-800/50">{label}</p>
                  <p className="text-sm font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-800/60">Reason for visit</p>
            <p className="mt-2 rounded-xl bg-surface p-4 text-sm leading-relaxed text-navy-800">{selected.reason}</p>
          </div>

          <div className="mt-6">
            <label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-navy-800/60">Doctor&apos;s notes / prescription</label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Write diagnosis, notes or prescription here..."
              className="mt-2 w-full resize-none rounded-xl border border-navy-900/10 bg-surface p-4 text-sm placeholder:text-navy-800/40 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50">
              <XCircle size={16} /> Cancel appointment
            </button>
            <button className="btn-primary rounded-xl">
              <CheckCircle2 size={16} /> Mark as completed
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorAppointments
