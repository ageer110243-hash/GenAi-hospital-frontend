import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import UserCell from '../components/UserCell'
import RowActions from '../components/RowActions'
import axios from 'axios'
import { useEffect } from 'react'

const columns = [
  { key: 'name', label: 'Patient', render: (r) => <UserCell name={r.name} sub={r.email} /> },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'bloodGroup', label: 'Blood group', render: (r) => <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">{r.bloodGroup}</span> },
  { key: 'disease', label: 'Condition' },
  { key: 'actions', label: 'Actions', render: () => <RowActions /> },
]

const AdminPatients = () => {
  const [patients, setPatients] = useState([])
   
  const getAllPatient = async()=>{
    try {
      const respone = await axios.get('http://localhost:8000/api/patient/getAll-patient',{
        withCredentials: true
      })
    console.log(respone.data.patients)
    setPatients(respone.data.patients)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllPatient()
  },[])
 

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="View and manage all registered patients."
        action={<button className="btn-primary rounded-xl"><Plus size={16} /> Add Patient</button>}
      />
      <DataTable columns={columns} rows={patients} searchPlaceholder="Search patients..." />
    </>
  )
}

export default AdminPatients