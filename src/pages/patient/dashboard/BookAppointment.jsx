import { useState } from 'react'
import { Stethoscope, UserRound, Calendar, FileText } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'

const fieldClass =
  'w-full rounded-xl border border-navy-900/10 bg-surface py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-navy-800/40 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200'
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800/60'
const iconClass = 'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-600'

const slots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']

const BookAppointment = () => {
  const [slot, setSlot] = useState('')
  
  // UI only: highlights the chosen slot
  const [appointment, setAppointment] = useState([])
  const [doctor, setDoctor]= useState([])

  return (
    <>
      <PageHeader title="Book an appointment" subtitle="Choose a department, doctor and a time that suits you." />

      <form className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm sm:p-8 xl:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="department" className={labelClass}>Department</label>
              <div className="relative">
                <Stethoscope size={18} className={iconClass} />
                <select id="department" name="department" defaultValue="" className={`${fieldClass} appearance-none`}>
                  <option value="" disabled>Select department</option>
                  <option>General Physician</option>
                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                  <option>ENT</option>
                  <option>Psychologist</option>
                  <option>Dentist</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="doctor" className={labelClass}>Doctor</label>
              <div className="relative">
                <UserRound size={18} className={iconClass} />
                <select id="doctor" name="doctor" defaultValue="" className={`${fieldClass} appearance-none`}>
                  <option value="" disabled>Select doctor</option>
                  <option>Dr. Ayesha Khan</option>
                  <option>Dr. Omar Siddiqui</option>
                  <option>Dr. Sara Ahmed</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="date" className={labelClass}>Date</label>
              <div className="relative">
                <Calendar size={18} className={iconClass} />
                <input id="date" type="date" name="date" className={fieldClass} />
              </div>
            </div>
          </div>

          {/* time slots */}
          <div>
            <p className={labelClass}>Available time slots</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {slots.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                    slot === s
                      ? 'border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-900/20'
                      : 'border-navy-900/10 bg-surface hover:border-brand-500 hover:text-brand-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="reason" className={labelClass}>Reason for visit</label>
            <div className="relative">
              <FileText size={18} className="pointer-events-none absolute left-4 top-4 text-brand-600" />
              <textarea
                id="reason"
                name="reason"
                rows={4}
                placeholder="Briefly describe your symptoms..."
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="h-fit rounded-2xl bg-linear-to-br from-brand-700 via-brand-800 to-navy-900 p-8 text-white shadow-xl shadow-brand-900/20">
          <h2 className="text-lg font-bold">Appointment summary</h2>
          <dl className="mt-6 space-y-4 text-sm">
            {[
              ['Department', '—'],
              ['Doctor', '—'],
              ['Date', '—'],
              ['Time', slot || '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-white/60">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <button type="submit" className="mt-8 w-full rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-400">
            Confirm appointment
          </button>
        </div>
      </form>
    </>
  )
}

export default BookAppointment
