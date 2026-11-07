import PageHeader from '../../../components/dashboard/PageHeader'
import DataTable from '../../../components/dashboard/DataTable'
import UserCell from '../../../components/dashboard/UserCell'
import RowActions from '../../../components/dashboard/RowActions'

const rows = [
  { name: 'Fatima Noor', email: 'fatima@mail.com', age: 28, gender: 'Female', bloodGroup: 'O+', condition: 'Asthma', lastVisit: '20 Oct 2026' },
  { name: 'Bilal Hussain', email: 'bilal@mail.com', age: 45, gender: 'Male', bloodGroup: 'A+', condition: 'Hypertension', lastVisit: '18 Oct 2026' },
  { name: 'Mariam Ali', email: 'mariam@mail.com', age: 8, gender: 'Female', bloodGroup: 'B+', condition: 'Flu', lastVisit: '15 Oct 2026' },
  { name: 'Hassan Raza', email: 'hassan@mail.com', age: 52, gender: 'Male', bloodGroup: 'AB-', condition: 'Diabetes', lastVisit: '10 Oct 2026' },
]

const columns = [
  { key: 'name', label: 'Patient', render: (r) => <UserCell name={r.name} sub={r.email} /> },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'bloodGroup', label: 'Blood group', render: (r) => <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">{r.bloodGroup}</span> },
  { key: 'condition', label: 'Condition' },
  { key: 'lastVisit', label: 'Last visit' },
  { key: 'actions', label: 'Actions', render: () => <RowActions /> },
]

const DoctorPatients = () => (
  <>
    <PageHeader title="My patients" subtitle="Patients who have booked appointments with you." />
    <DataTable columns={columns} rows={rows} searchPlaceholder="Search patients..." />
  </>
)

export default DoctorPatients
