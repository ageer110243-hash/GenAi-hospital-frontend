
import { useEffect, useState } from 'react'
import {
  Calendar,
  Clock,
  Phone,
  Droplet,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'
import axios from 'axios'

const DoctorAppointments = () => {

  const [appointments, setAppointments] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  // Fetch doctor's appointments
  const fetchAppointments = async () => {
    try {

      const response = await axios.get(
        "http://localhost:8000/api/appointment/doctor",
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      const data = response.data.appointments || []

      setAppointments(data)

      if (data.length > 0) {
        setSelectedId(prev =>
          data.some(a => a._id === prev) ? prev : data[0]._id
        )
      } else {
        setSelectedId(null)
      }

    } catch (error) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  // Approve appointment
  const approveAppointment = async (id) => {

    try {

      setActionLoading(true)

      const response = await axios.put(
        `http://localhost:8000/api/appointment/approve/${id}`,
        {},
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      await fetchAppointments()

      alert("Appointment approved successfully!")

    } catch (error) {

      console.log(error.response?.data || error.message)
      alert("Unable to approve appointment")

    } finally {
      setActionLoading(false)
    }
  }

  // Reject appointment
  const rejectAppointment = async (id) => {

    const confirmReject = window.confirm(
      "Are you sure you want to reject this appointment?"
    )

    if (!confirmReject) return

    try {

      setActionLoading(true)

      const response = await axios.put(
        `http://localhost:8000/api/appointment/reject/${id}`,
        {},
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      await fetchAppointments()

      alert("Appointment rejected successfully!")

    } catch (error) {

      console.log(error.response?.data || error.message)
      alert("Unable to reject appointment")

    } finally {
      setActionLoading(false)
    }
  }

  // Load appointments when page opens
  useEffect(() => {
    fetchAppointments()
  }, [])

  const selected =
    appointments.find(a => a._id === selectedId) || appointments[0]

  return (
    <>
      <PageHeader
        title="Appointment details"
        subtitle="Select an appointment to see the full details."
      />

      {loading ? (

        <p className="text-sm text-navy-800/60">
          Loading appointments...
        </p>

      ) : !selected ? (

        <p className="text-sm text-navy-800/60">
          No appointments found.
        </p>

      ) : (

        <div className="grid gap-6 xl:grid-cols-5">

          {/* Appointment List */}

          <div className="space-y-3 xl:col-span-2">

            {appointments.map((a) => {

              const patient = a.patient || {}

              return (

                <button
                  key={a._id}
                  onClick={() => setSelectedId(a._id)}
                  className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/5 ${
                    selected._id === a._id
                      ? 'border-brand-500 ring-2 ring-brand-200'
                      : 'border-navy-900/5'
                  }`}
                >

                  <div className="flex items-center justify-between gap-3">

                    <UserCell
                      name={patient.name || 'Unknown Patient'}
                      sub={`${a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString('en-GB') : '—'} · ${a.time || '—'}`}
                    />

                    <StatusBadge status={a.status} />

                  </div>

                </button>

              )
            })}

          </div>

          {/* Appointment Details */}

          <div className="h-fit rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm sm:p-8 xl:col-span-3">

            <div className="flex flex-wrap items-start justify-between gap-4">

              <div className="flex items-center gap-4">

                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-navy-800 text-2xl font-extrabold text-white">

                  {(selected.patient?.name || 'P')[0]}

                </span>

                <div>

                  <h2 className="text-xl font-bold">
                    {selected.patient?.name || 'Unknown Patient'}
                  </h2>

                  <p className="text-sm text-navy-800/60">
                    {selected.patient?.age || 'N/A'} years old
                  </p>

                </div>

              </div>

              <StatusBadge status={selected.status} />

            </div>

            {/* Patient Information */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: Calendar,
                  label: 'Date',
                  value: selected.appointmentDate
                    ? new Date(selected.appointmentDate).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
                      )
                    : '—'
                },
                {
                  icon: Clock,
                  label: 'Time',
                  value: selected.time || '—'
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: selected.patient?.phone || '—'
                },
                {
                  icon: Droplet,
                  label: 'Blood group',
                  value: selected.patient?.bloodGroup || '—'
                }
              ].map(({ icon: Icon, label, value }) => (

                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl bg-surface p-4"
                >

                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-brand-600">

                    <Icon size={18} />

                  </span>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-800/50">
                      {label}
                    </p>

                    <p className="text-sm font-bold">
                      {value}
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* Reason for Visit */}

            <div className="mt-6">

              <p className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                Reason for visit
              </p>

              <p className="mt-2 rounded-xl bg-surface p-4 text-sm leading-relaxed text-navy-800">
                {selected.reason || 'No reason provided'}
              </p>

            </div>

            {/* Approve and Reject Buttons */}

            {selected.status === 'Pending' ? (

              <div className="mt-6 flex flex-wrap justify-end gap-3">

                <button
                  disabled={actionLoading}
                  onClick={() => rejectAppointment(selected._id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >

                  <XCircle size={16} />

                  Reject

                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => approveAppointment(selected._id)}
                  className="btn-primary rounded-xl disabled:opacity-50"
                >

                  <CheckCircle2 size={16} />

                  Approve

                </button>

              </div>

            ) : (

              <div className="mt-6 rounded-xl bg-surface p-4 text-sm font-semibold text-navy-800">

                Appointment Status: {selected.status}

              </div>

            )}

          </div>

        </div>

      )}

    </>
  )
}

export default DoctorAppointments
