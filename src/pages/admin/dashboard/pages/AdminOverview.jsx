import { useState } from 'react'
import { CalendarCheck, Stethoscope, Users, UserCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'

// Dummy data (remove when the API is connected)
const dummyOverview = {
  stats: {
    totalDoctors: 128,
    totalPatients: 2540,
    todayAppointments: 64,
    pendingApprovals: 9,
  },
  recentAppointments: [
    { patient: 'Fatima Noor', doctor: 'Dr. Ayesha Khan', time: '10:30 AM', status: 'Confirmed' },
    { patient: 'Bilal Hussain', doctor: 'Dr. Omar Siddiqui', time: '11:15 AM', status: 'Pending' },
    { patient: 'Mariam Ali', doctor: 'Dr. Sara Ahmed', time: '12:00 PM', status: 'Completed' },
    { patient: 'Hassan Raza', doctor: 'Dr. Hamza Raza', time: '01:30 PM', status: 'Cancelled' },
  ],
  pendingDoctors: [
    { _id: '1', name: 'Dr. Imran Shah', specialization: 'Dermatologist' },
    { _id: '2', name: 'Dr. Noor Fatima', specialization: 'Cardiologist' },
    { _id: '3', name: 'Dr. Zain Malik', specialization: 'ENT' },
  ],
}


const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient} /> },
  { key: 'doctor', label: 'Doctor' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const AdminOverview = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(dummyOverview) // dummy data for now

  // TODO(API): replace the dummy data with a real request.
  // (add `import axios from 'axios'` and useEffect to the react import)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get('http://localhost:8000/api/admin/overview', { withCredentials: true })
  //     setData(data)
  //   }
  //   fetchData()
  // }, [])


  const { stats, recentAppointments, pendingDoctors } = data

  return (
    <>
      <PageHeader title="Dashboard overview" subtitle="A quick look at how the hospital is doing today." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Stethoscope} label="Total Doctors" value={stats.totalDoctors} note="+4 this month" />
        <StatCard icon={Users} label="Total Patients" value={stats.totalPatients} note="+120 this month" tone="navy" />
        <StatCard icon={CalendarCheck} label="Today's Appointments" value={stats.todayAppointments} note="12 pending" tone="gold" />
        <StatCard icon={UserCheck} label="Pending Approvals" value={stats.pendingApprovals} note="Needs review" tone="red" />
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
