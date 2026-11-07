import PageHeader from '../../../components/dashboard/PageHeader'
import DataTable from '../../../components/dashboard/DataTable'
import StatusBadge from '../../../components/dashboard/StatusBadge'
import UserCell from '../../../components/dashboard/UserCell'
import RowActions from '../../../components/dashboard/RowActions'

const rows = [
  { patient: 'Fatima Noor', doctor: 'Dr. Ayesha Khan', department: 'Cardiology', date: '26 Oct 2026', time: '10:30 AM', status: 'Confirmed' },
  { patient: 'Bilal Hussain', doctor: 'Dr. Omar Siddiqui', department: 'General', date: '26 Oct 2026', time: '11:15 AM', status: 'Pending' },
  { patient: 'Mariam Ali', doctor: 'Dr. Sara Ahmed', department: 'Dental', date: '26 Oct 2026', time: '12:00 PM', status: 'Completed' },
  { patient: 'Hassan Raza', doctor: 'Dr. Hamza Raza', department: 'ENT', date: '27 Oct 2026', time: '01:30 PM', status: 'Cancelled' },
  { patient: 'Ayesha Tariq', doctor: 'Dr. Imran Shah', department: 'Dermatology', date: '27 Oct 2026', time: '03:00 PM', status: 'Confirmed' },
]

const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient} /> },
  { key: 'doctor', label: 'Doctor' },
  { key: 'department', label: 'Department' },
  { key: 'date', label: 'Date', render: (r) => <div><p>{r.date}</p><p className="text-xs text-navy-800/60">{r.time}</p></div> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <RowActions /> },
]

const AdminAppointments = () => (
  <>
    <PageHeader title="Appointments" subtitle="Track and manage every appointment in one place." />
    <DataTable columns={columns} rows={rows} searchPlaceholder="Search appointments..." />
  </>
)

export default AdminAppointments
