import { CalendarCheck, Users, Clock, CheckCircle2 } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import StatCard from '../../../components/dashboard/StatCard'
import DataTable from '../../../components/dashboard/DataTable'
import StatusBadge from '../../../components/dashboard/StatusBadge'
import UserCell from '../../../components/dashboard/UserCell'

const today = [
  { patient: 'Fatima Noor', reason: 'Chest pain', time: '10:30 AM', status: 'Confirmed' },
  { patient: 'Bilal Hussain', reason: 'Follow-up', time: '11:15 AM', status: 'Pending' },
  { patient: 'Mariam Ali', reason: 'Routine check-up', time: '12:00 PM', status: 'Completed' },
  { patient: 'Hassan Raza', reason: 'ECG review', time: '01:30 PM', status: 'Confirmed' },
]

const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient} /> },
  { key: 'reason', label: 'Reason' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const DoctorOverview = () => (
  <>
    <PageHeader title="Good morning, Dr. Ayesha 👋" subtitle="Here is your schedule for today." />

    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={CalendarCheck} label="Today's Appointments" value="12" note="4 remaining" />
      <StatCard icon={Users} label="Total Patients" value="340" tone="navy" note="+8 this week" />
      <StatCard icon={Clock} label="Pending Requests" value="5" tone="gold" note="Needs response" />
      <StatCard icon={CheckCircle2} label="Completed" value="8" tone="teal" note="Today" />
    </div>

    <h2 className="mb-4 mt-8 text-lg font-bold">Today&apos;s schedule</h2>
    <DataTable columns={columns} rows={today} showToolbar={false} />
  </>
)

export default DoctorOverview
