import { Download } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import DataTable from '../../../components/dashboard/DataTable'
import StatusBadge from '../../../components/dashboard/StatusBadge'
import UserCell from '../../../components/dashboard/UserCell'

const rows = [
  { doctor: 'Dr. Ayesha Khan', department: 'Cardiology', date: '20 Oct 2026', time: '10:30 AM', status: 'Completed' },
  { doctor: 'Dr. Omar Siddiqui', department: 'General', date: '02 Oct 2026', time: '12:00 PM', status: 'Completed' },
  { doctor: 'Dr. Sara Ahmed', department: 'Dental', date: '18 Sep 2026', time: '03:30 PM', status: 'Cancelled' },
  { doctor: 'Dr. Hamza Raza', department: 'ENT', date: '05 Sep 2026', time: '11:00 AM', status: 'Completed' },
  { doctor: 'Dr. Imran Shah', department: 'Dermatology', date: '21 Aug 2026', time: '04:00 PM', status: 'Completed' },
]

const columns = [
  { key: 'doctor', label: 'Doctor', render: (r) => <UserCell name={r.doctor} sub={r.department} /> },
  { key: 'date', label: 'Date', render: (r) => <div><p>{r.date}</p><p className="text-xs text-navy-800/60">{r.time}</p></div> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    label: 'Prescription',
    render: () => (
      <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-brand-700 transition hover:bg-brand-50">
        <Download size={14} /> Download
      </button>
    ),
  },
]

const PreviousAppointments = () => (
  <>
    <PageHeader title="Previous appointments" subtitle="Your complete visit history." />
    <DataTable columns={columns} rows={rows} searchPlaceholder="Search by doctor..." />
  </>
)

export default PreviousAppointments
