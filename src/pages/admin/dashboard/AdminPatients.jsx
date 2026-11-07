import { Plus } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'
import DataTable from '../../../components/dashboard/DataTable'
import UserCell from '../../../components/dashboard/UserCell'
import RowActions from '../../../components/dashboard/RowActions'

const rows = [
  { name: 'Fatima Noor', email: 'fatima@mail.com', age: 28, gender: 'Female', bloodGroup: 'O+', disease: 'Asthma' },
  { name: 'Bilal Hussain', email: 'bilal@mail.com', age: 45, gender: 'Male', bloodGroup: 'A+', disease: 'Hypertension' },
  { name: 'Mariam Ali', email: 'mariam@mail.com', age: 8, gender: 'Female', bloodGroup: 'B+', disease: 'Flu' },
  { name: 'Hassan Raza', email: 'hassan@mail.com', age: 52, gender: 'Male', bloodGroup: 'AB-', disease: 'Diabetes' },
  { name: 'Ayesha Tariq', email: 'ayesha@mail.com', age: 33, gender: 'Female', bloodGroup: 'O-', disease: 'Migraine' },
]

const columns = [
  { key: 'name', label: 'Patient', render: (r) => <UserCell name={r.name} sub={r.email} /> },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'bloodGroup', label: 'Blood group', render: (r) => <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">{r.bloodGroup}</span> },
  { key: 'disease', label: 'Condition' },
  { key: 'actions', label: 'Actions', render: () => <RowActions /> },
]

const AdminPatients = () => (
  <>
    <PageHeader
      title="Patients"
      subtitle="View and manage all registered patients."
      action={<button className="btn-primary rounded-xl"><Plus size={16} /> Add Patient</button>}
    />
    <DataTable columns={columns} rows={rows} searchPlaceholder="Search patients..." />
  </>
)

export default AdminPatients
