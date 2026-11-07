import { CalendarCheck, Stethoscope, Users, UserCheck } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import StatCard from '../../../components/dashboard/StatCard'
import DataTable from '../../../components/dashboard/DataTable'
import StatusBadge from '../../../components/dashboard/StatusBadge'
import UserCell from '../../../components/dashboard/UserCell'

const recent = [
  { patient: 'Fatima Noor', doctor: 'Dr. Ayesha Khan', time: '10:30 AM', status: 'Confirmed' },
  { patient: 'Bilal Hussain', doctor: 'Dr. Omar Siddiqui', time: '11:15 AM', status: 'Pending' },
  { patient: 'Mariam Ali', doctor: 'Dr. Sara Ahmed', time: '12:00 PM', status: 'Completed' },
  { patient: 'Hassan Raza', doctor: 'Dr. Hamza Raza', time: '01:30 PM', status: 'Cancelled' },
]

const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient} /> },
  { key: 'doctor', label: 'Doctor' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const pending = [
  { name: 'Dr. Imran Shah', sub: 'Dermatologist' },
  { name: 'Dr. Noor Fatima', sub: 'Cardiologist' },
  { name: 'Dr. Zain Malik', sub: 'ENT' },
]

const AdminOverview = () => (
  <>
    <PageHeader title="Dashboard overview" subtitle="A quick look at how the hospital is doing today." />

    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={Stethoscope} label="Total Doctors" value="128" note="+4 this month" />
      <StatCard icon={Users} label="Total Patients" value="2,540" note="+120 this month" tone="navy" />
      <StatCard icon={CalendarCheck} label="Today's Appointments" value="64" note="12 pending" tone="gold" />
      <StatCard icon={UserCheck} label="Pending Approvals" value="9" note="Needs review" tone="red" />
    </div>

    <div className="mt-8 grid gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <h2 className="mb-4 text-lg font-bold">Recent appointments</h2>
        <DataTable columns={columns} rows={recent} showToolbar={false} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold">Doctor approvals</h2>
        <div className="space-y-3 rounded-2xl border border-navy-900/5 bg-white p-5 shadow-sm">
          {pending.map((d) => (
            <div key={d.name} className="space-y-3 border-b border-navy-900/5 pb-4 last:border-0 last:pb-0">
              <UserCell name={d.name} sub={d.sub} />
              <div className="grid grid-cols-2 gap-2">
                <button className="rounded-lg bg-brand-700 py-2 text-xs font-bold text-white transition hover:bg-brand-800">Approve</button>
                <button className="rounded-lg border border-red-200 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
)

export default AdminOverview
