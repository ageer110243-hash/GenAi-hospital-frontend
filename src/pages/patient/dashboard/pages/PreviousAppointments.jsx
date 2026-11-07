
import { useState, useEffect } from 'react'
import { XCircle } from 'lucide-react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'

// Date format
const formatDate = (date) => {
  if (!date) return '—'

  const d = new Date(date)

  if (isNaN(d)) return date

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// Capitalize status
const capitalize = (s = '') =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

// Normalize backend data
const normalize = (a) => ({
  _id: a._id,
  doctor: a.doctor?.name ||
    (typeof a.doctor === 'string' ? a.doctor : 'Unknown doctor'),

  department: a.department ||
    a.doctor?.department ||
    a.doctor?.specialization || '',

  date: formatDate(a.appointmentDate || a.date),
  time: a.time || '',
  status: capitalize(a.status || 'Pending'),
})

const PreviousAppointments = () => {

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/appointment/patient',
        {
          withCredentials: true,
        }
      )

      setAppointments(
        (res.data.appointments || []).map(normalize)
      )

    } catch (error) {
      console.log('Unable to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  // Cancel appointment
  const cancelAppointment = async (id) => {

    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )

    if (!confirmCancel) return

    try {

      await axios.put(
        `http://localhost:8000/api/appointment/cancle/${id}`,
        {},
        {
          withCredentials: true
        }
      )

      // Update appointment status
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: 'Cancelled' }
            : appointment
        )
      )

      alert('Appointment cancelled successfully')

    } catch (error) {
      console.log('Unable to cancel appointment')
      alert('Unable to cancel appointment')
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // Table columns
  const columns = [
    {
      key: 'doctor',
      label: 'Doctor',
      render: (r) => (
        <UserCell name={r.doctor} sub={r.department} />
      ),
    },

    {
      key: 'date',
      label: 'Date',
      render: (r) => (
        <div>
          <p>{r.date}</p>
          <p className="text-xs text-navy-800/60">{r.time}</p>
        </div>
      ),
    },

    {
      key: 'status',
      label: 'Status',
      render: (r) => (
        <StatusBadge status={r.status} />
      ),
    },

    {
      key: 'actions',
      label: 'Action',
      render: (r) => (
        <button
          onClick={() => cancelAppointment(r._id)}
          disabled={
            ['Cancelled', 'Rejected', 'Complete'].includes(r.status)
          }
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <XCircle size={14} />
          Cancel
        </button>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Previous appointments"
        subtitle="Your complete visit history."
      />

      {loading ? (
        <p className="text-sm text-navy-800/60">
          Loading appointments...
        </p>
      ) : (
        <DataTable
          columns={columns}
          rows={appointments}
          searchPlaceholder="Search by doctor..."
        />
      )}
    </>
  )
}

export default PreviousAppointments
