import { useEffect, useState } from 'react'
import { CalendarDays, Users, CheckCircle2, XCircle } from 'lucide-react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'

const todayISO = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD

const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient?.name || 'Unknown'} sub={r.patient?.phone} /> },
  { key: 'reason', label: 'Reason', render: (r) => <span className="line-clamp-1 max-w-[16rem]">{r.reason}</span> },
  { key: 'time', label: 'Time', render: (r) => r.time || '—' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const DoctorOverview = () => {
  const [appointments, setAppointments] = useState([]) // only THIS doctor's appointments
  const [doctor, setDoctor] = useState(null)

  // call 1: this doctor's appointments (the backend finds the doctor from the login cookie)
  const getAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/appointment/doctor', {
        withCredentials: true,
      })
      setAppointments(response.data.appointments)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  // call 2: the doctor's name for the heading
  const getDoctorProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/doctor/profile', {
        withCredentials: true,
      })
      setDoctor(response.data.doctor)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getAppointments()
    getDoctorProfile()
  }, [])

  const count = (status) => appointments.filter((a) => a.status === status).length
  // one patient can book many times, so count every patient only once
  const totalPatients = new Set(appointments.map((a) => a.patient?._id).filter(Boolean)).size
  const todays = appointments.filter((a) => String(a.appointmentDate).slice(0, 10) === todayISO)

  return (
    <>
      <PageHeader
        title={doctor ? `Welcome back, ${doctor.name}` : 'Welcome back'}
        subtitle="Here is a summary of your appointments."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarDays}
          label="Total appointments"
          value={appointments.length}
          note={`${count('Pending')} pending · ${count('Completed')} completed`}
        />
        <StatCard icon={Users} label="Total patients" value={totalPatients} tone="navy" note="Different patients" />
        <StatCard icon={CheckCircle2} label="Approved" value={count('Approved')} tone="teal" note="Accepted by you" />
        <StatCard icon={XCircle} label="Rejected" value={count('Rejected')} tone="red" note="Declined by you" />
      </div>

      <h2 className="mb-4 mt-8 text-lg font-bold">Today&apos;s schedule</h2>
      <DataTable columns={columns} rows={todays} showToolbar={false} />
    </>
  )
}

export default DoctorOverview