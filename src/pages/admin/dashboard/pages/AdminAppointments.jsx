import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'
import RowActions from '../components/RowActions'
import axios from 'axios'
import { useEffect } from 'react'

// the API returns patient / doctor as objects ( .populate("patient", ...) ) and the date as ISO text
const columns = [
  { key: 'patient', label: 'Patient', render: (r) => <UserCell name={r.patient?.name || 'Unknown'} sub={r.patient?.phone} /> },
  { key: 'doctor', label: 'Doctor', render: (r) => r.doctor?.name || 'Unknown' },
  { key: 'department', label: 'Department', render: (r) => r.department || '-' },
  {
    key: 'date',
    label: 'Date',
    render: (r) => (
      <div>
        <p>{new Date(r.appointmentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <p className="text-xs text-navy-800/60">{r.time}</p>
      </div>
    ),
  },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <RowActions /> },
]

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]) 
  
  const getAllAppointment = async () =>{
    try {
      
      const respone = await axios.get("http://localhost:8000/api/appointment/allApointment",{
        withCredentials: true
      })

      console.log(respone)
      setAppointments(respone.data.appointments)

    } catch (error) {
      
      console.log(error)
    }

  }


  useEffect(()=>{
    getAllAppointment()
  }, [])

 

  return (
    <>
      <PageHeader title="Appointments" subtitle="Track and manage every appointment in one place." />
      <DataTable columns={columns} rows={appointments} searchPlaceholder="Search appointments..." />
    </>
  )
}

export default AdminAppointments