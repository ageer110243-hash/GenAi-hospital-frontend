import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'
import RowActions from '../components/RowActions'
import axios from 'axios'
import { useEffect } from 'react'

const AdminDoctors = () => {
  const [Search, setSearch] = useState('')
  const [doctors, setDoctors] = useState([])

  // id of the clicked doctor is passed in from the table row
  const approvedDoctor = async (id)=>{
   try {
     const response = await axios.post(`http://localhost:8000/api/admin/approve-doctor/${id}`, {}, {
      withCredentials: true
     })
    console.log(response)
    getAllDoctor() // refresh the table

   } catch (error) {
    console.log(error)
   }
  }

  const rejectDoctor = async(id)=>{
    // reject DELETES the doctor in your backend, so ask first
    if(!window.confirm('Reject this doctor? The application will be deleted.')) return

    try {

      const response = await axios.post(`http://localhost:8000/api/admin/reject-doctor/${id}`, {}, {
        withCredentials: true
      })
      console.log(response)
      getAllDoctor() // refresh the table
    } catch (error) {

      console.log(error)
    }
  }

  const getAllDoctor = async ()=>{
    try {
    const response = await axios.get('http://localhost:8000/api/doctor/getall-doctors',{
      withCredentials: true
    }
    )
    console.log(response)
    setDoctors(response.data.doctors)

    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
  getAllDoctor()

},[])

  const columns = [
    { key: 'name', label: 'Doctor', render: (r) => <UserCell name={r.name} sub={r.email} /> },
    { key: 'specialization', label: 'Specialization' },
    { key: 'experience', label: 'Experience' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <RowActions
          onApprove={() => approvedDoctor(r._id)}
          onReject={() => rejectDoctor(r._id)}
          canApprove={r.status !== 'Approved'}
        />
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Doctors"
        subtitle="Approve, review and manage all registered doctors."
        action={<button className="btn-primary rounded-xl"><Plus size={16} /> Add Doctor</button>}
      />
      <DataTable columns={columns} rows={doctors} searchPlaceholder="Search doctors..." />
    </>
  )
}

export default AdminDoctors