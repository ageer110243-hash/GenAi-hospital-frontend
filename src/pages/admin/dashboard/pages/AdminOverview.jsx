import { useEffect, useState } from 'react'
import { CalendarCheck, Stethoscope, Users, UserCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'
import axios from 'axios'

const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient} /> },
  { key: 'doctor', label: 'Doctor' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const AdminOverview = () => {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])

  const getAllAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/appointment/allApointment", {
        withCredentials: true
      })
      console.log(response)
      setAppointments(response.data.appointments || [])
    } catch (error) {
      console.log(error)
    }
  }

  const getAllDoctor = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/doctor/getall-doctors", {
        withCredentials: true
      })
      console.log(response)
      setDoctors(response.data.doctors || [])
    } catch (error) {
      console.log(error)
    }
  }

  const getPatient = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patient/getAll-patient", {
        withCredentials: true
      })
      console.log(response)
      setPatients(response.data.patients || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllAppointment()
    getAllDoctor()
    getPatient()
  }, [])

  // aaj ki appointments


  // table ke liye data (latest 5)
  const recentAppointments = appointments.slice(0, 5).map((a) => ({
    _id: a._id,
    patient: a.patient?.name || 'Unknown',
    doctor: a.doctor?.name || 'Unknown',
    time: a.time,
    status: a.status || 'Pending',
  }))

  // pending doctors
  const pendingDoctors = doctors.filter((d) => d.status === 'pending')

  return (
    <>
      <PageHeader title="Dashboard overview" subtitle="A quick look at how the hospital is doing today." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Stethoscope} label="Total Doctors" value={doctors.length} note="All doctors" />
        <StatCard icon={Users} label="Total Patients" value={patients.length} note="All patients" tone="navy" />
        <StatCard icon={CalendarCheck} label="Total Appointments" value={appointments.length} note="Today" tone="gold" />
        <StatCard icon={UserCheck} label="Pending Approvals" value={pendingDoctors.length} note="Needs review" tone="red" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-bold">Recent appointments</h2>
          <DataTable columns={columns} rows={recentAppointments} showToolbar={false} />
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold">Doctor approvals</h2>
          <div className="space-y-3 rounded-2xl border border-navy-900/5 bg-white p-5 shadow-sm">
            {pendingDoctors.map((d) => (
              <div key={d._id} className="space-y-3 border-b border-navy-900/5 pb-4 last:border-0 last:pb-0">
                <UserCell name={d.name} sub={d.specialization} />
                <div className="grid grid-cols-2 gap-2">
                  {/* TODO(API): onClick -> approve doctor */}
                  <button className="rounded-lg bg-brand-700 py-2 text-xs font-bold text-white transition hover:bg-brand-800">Approve</button>
                  {/* TODO(API): onClick -> reject doctor */}
                  <button className="rounded-lg border border-red-200 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminOverview