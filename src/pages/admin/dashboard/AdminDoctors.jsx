import { Plus } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import DataTable from '../../../components/dashboard/DataTable'
import StatusBadge from '../../../components/dashboard/StatusBadge'
import UserCell from '../../../components/dashboard/UserCell'
import RowActions from '../../../components/dashboard/RowActions'

const rows = [
  { name: 'Dr. Ayesha Khan', email: 'ayesha@aurelia.com', specialization: 'Cardiologist', experience: '15 yrs', status: 'Approved' },
  { name: 'Dr. Omar Siddiqui', email: 'omar@aurelia.com', specialization: 'General Physician', experience: '12 yrs', status: 'Approved' },
  { name: 'Dr. Sara Ahmed', email: 'sara@aurelia.com', specialization: 'Dentist', experience: '10 yrs', status: 'Pending' },
  { name: 'Dr. Hamza Raza', email: 'hamza@aurelia.com', specialization: 'ENT', experience: '18 yrs', status: 'Approved' },
  { name: 'Dr. Imran Shah', email: 'imran@aurelia.com', specialization: 'Dermatologist', experience: '7 yrs', status: 'Rejected' },
]

const columns = [
  { key: 'name', label: 'Doctor', render: (r) => <UserCell name={r.name} sub={r.email} /> },
  { key: 'specialization', label: 'Specialization' },
  { key: 'experience', label: 'Experience' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <RowActions /> },
]

const AdminDoctors = () => (
  <>
    <PageHeader
      title="Doctors"
      subtitle="Approve, review and manage all registered doctors."
      action={<button className="btn-primary rounded-xl"><Plus size={16} /> Add Doctor</button>}
    />
    <DataTable columns={columns} rows={rows} searchPlaceholder="Search doctors..." />
  </>
)

export default AdminDoctors
