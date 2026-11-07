import { useState } from 'react'
import { CalendarCheck, Users, Clock, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'

// Dummy data (remove when the API is connected)
const dummyOverview = {
  stats: { todayAppointments: 12, totalPatients: 340, pendingRequests: 5, completed: 8 },
  todaySchedule: [
    { _id: '1', patient: 'Fatima Noor', reason: 'Chest pain', time: '10:30 AM', status: 'Confirmed' },
    { _id: '2', patient: 'Bilal Hussain', reason: 'Follow-up', time: '11:15 AM', status: 'Pending' },
    { _id: '3', patient: 'Mariam Ali', reason: 'Routine check-up', time: '12:00 PM', status: 'Completed' },
    { _id: '4', patient: 'Hassan Raza', reason: 'ECG review', time: '01:30 PM', status: 'Confirmed' },
  ],
}


const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient} /> },
  { key: 'reason', label: 'Reason' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const DoctorOverview = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(dummyOverview) // dummy data for now

  // TODO(API): replace the dummy data with a real request.
  // (add `import axios from 'axios'` and useEffect to the react import)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get('http://localhost:8000/api/doctor/overview', { withCredentials: true })
  //     setData(data)
  //   }
  //   fetchData()
  // }, [])


  const { stats, todaySchedule } = data

  return (
    <>
      <PageHeader title="Welcome back, Doctor" subtitle="Here is your schedule for today." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Today's Appointments" value={stats.todayAppointments} note="4 remaining" />
        <StatCard icon={Users} label="Total Patients" value={stats.totalPatients} tone="navy" note="+8 this week" />
        <StatCard icon={Clock} label="Pending Requests" value={stats.pendingRequests} tone="gold" note="Needs response" />
        <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} tone="teal" note="Today" />
      </div>

      <h2 className="mb-4 mt-8 text-lg font-bold">Today&apos;s schedule</h2>
      <DataTable columns={columns} rows={todaySchedule} showToolbar={false} />
    </>
  )
}

export default DoctorOverview
