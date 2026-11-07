import { useState, useEffect } from 'react'
import { Stethoscope, UserRound, Calendar, FileText } from 'lucide-react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'

const slots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']

const fieldClass =
  'w-full rounded-xl border border-navy-900/10 bg-surface py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-navy-800/40 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200'
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800/60'
const iconClass = 'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-600'

const initialForm = {
  doctor: '',
  department: '',
  appointmentDate: '',
  time: '',
  reason: '',
}

// doctor ka department kis field mein hai, yahan se handle hota hai
const getDept = (d) => (d.department || d.specialization || d.speciality || '').trim()

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  // doctors fetch
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/api/doctor/getall-doctors',
          { withCredentials: true }
        )
        console.log(res.data)
        setDoctors(res.data.doctors || res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDoctors()
  }, [])

  // departments doctors se nikalo (duplicates hata kar)
  const departments = [...new Set(doctors.map(getDept))].filter(Boolean)

  // selected department ke doctors
  const filteredDoctors = form.department
    ? doctors.filter(
        (d) => getDept(d).toLowerCase() === form.department.toLowerCase()
      )
    : doctors

  const selectedDoctor = doctors.find((d) => d._id === form.doctor)

  const handleBook = async (e) => {
    e.preventDefault()

    if (!form.department || !form.doctor || !form.appointmentDate || !form.time) {
      alert('Please select department, doctor, date and time')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        'http://localhost:8000/api/appointment/book',
        form,
        { withCredentials: true }
      )
      console.log(res.data)
      alert('Appointment booked successfully')
      setForm(initialForm)
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="Book an appointment" subtitle="Choose a department, doctor and a time that suits you." />

      <form onSubmit={handleBook} className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm sm:p-8 xl:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="department" className={labelClass}>Department</label>
              <div className="relative">
                <Stethoscope size={18} className={iconClass} />
                <select
                  id="department"
                  value={form.department}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, department: e.target.value, doctor: '' }))
                  }
                  className={`${fieldClass} appearance-none`}
                >
                  <option value="" disabled>Select department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="doctor" className={labelClass}>Doctor</label>
              <div className="relative">
                <UserRound size={18} className={iconClass} />
                <select
                  id="doctor"
                  value={form.doctor}
                  onChange={set('doctor')}
                  className={`${fieldClass} appearance-none`}
                >
                  <option value="" disabled>Select doctor</option>
                  {filteredDoctors.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="date" className={labelClass}>Date</label>
              <div className="relative">
                <Calendar size={18} className={iconClass} />
                <input
                  id="date"
                  type="date"
                  value={form.appointmentDate}
                  onChange={set('appointmentDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className={fieldClass}
                />
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
                  onClick={() => setForm((prev) => ({ ...prev, time: s }))}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                    form.time === s
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
                rows={4}
                value={form.reason}
                onChange={set('reason')}
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
              ['Department', form.department || '—'],
              ['Doctor', selectedDoctor?.name || '—'],
              ['Date', form.appointmentDate || '—'],
              ['Time', form.time || '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-white/60">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-400 disabled:opacity-60"
          >
            {loading ? 'Booking...' : 'Confirm appointment'}
          </button>
        </div>
      </form>
    </>
  )
}

export default BookAppointment