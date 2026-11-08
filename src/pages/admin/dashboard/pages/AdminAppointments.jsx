import { useState, useEffect } from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import UserCell from '../components/UserCell'
import axios from 'axios'

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState('')

  const [detail, setDetail] = useState(null)         // eye modal
  const [editData, setEditData] = useState(null)     // edit modal
  const [deleteData, setDeleteData] = useState(null) // delete modal

  const getAllAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/appointment/allApointment", {
        withCredentials: true
      })
      console.log(response)
      setAppointments(response.data.appointments || [])
    } catch (error) {
      console.log(error)
    }
  }

  const getAllAppointmentDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/appointment/${id}`, {
        withCredentials: true
      })
      console.log(response)
      setDetail(response.data.appointment)
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateAppointment = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/appointment/update/${editData._id}`,
        { status: newStatus },
        { withCredentials: true }
      )
      console.log(response)
      setEditData(null)
      getAllAppointment()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAppointment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/appointment/delete/${deleteData._id}`,
        { withCredentials: true }
      )
      console.log(response)
      setDeleteData(null)
      getAllAppointment()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllAppointment()
  }, [])

  // status se search
  const filtered = appointments.filter((a) =>
    (a.status || '').toLowerCase().includes(search.toLowerCase())
  )

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
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <button onClick={() => getAllAppointmentDetail(r._id)} className="rounded-lg p-2 text-brand-700 hover:bg-brand-50">
            <Eye size={16} />
          </button>
          <button onClick={() => setEditData(r)} className="rounded-lg p-2 text-navy-800 hover:bg-surface">
            <Pencil size={16} />
          </button>
          <button onClick={() => setDeleteData(r)} className="rounded-lg p-2 text-red-600 hover:bg-red-50">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Appointments" subtitle="Track and manage every appointment in one place." />

      {/* search bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by status (pending, approved, rejected...)"
        className="mb-5 w-full max-w-md rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
      />

      <DataTable columns={columns} rows={filtered} showToolbar={false} />

      {/* VIEW MODAL */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6 text-sm">
            <h2 className="text-lg font-bold">Appointment details</h2>
            <p><b>Patient:</b> {detail.patient?.name}</p>
            <p><b>Phone:</b> {detail.patient?.phone}</p>
            <p><b>Doctor:</b> {detail.doctor?.name}</p>
            <p><b>Department:</b> {detail.department}</p>
            <p><b>Date:</b> {new Date(detail.appointmentDate).toLocaleDateString('en-GB')}</p>
            <p><b>Time:</b> {detail.time}</p>
            <p><b>Status:</b> {detail.status}</p>
            <p><b>Reason:</b> {detail.reason}</p>
            <button onClick={() => setDetail(null)} className="mt-2 w-full rounded-xl bg-brand-700 py-2.5 font-bold text-white">
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL: sirf Approve / Reject */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold">Update status</h2>
            <p className="text-sm text-navy-800/70">
              {editData.patient?.name || 'Patient'} appointment {editData.doctor?.name ? `(${editData.doctor.name})` : ''}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => UpdateAppointment('Approved')}
                className="rounded-xl bg-brand-700 py-3 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                Approve
              </button>
              <button
                onClick={() => UpdateAppointment('Rejected')}
                className="rounded-xl border border-red-200 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                Reject
              </button>
            </div>
            <button
              onClick={() => setEditData(null)}
              className="w-full rounded-xl py-2.5 text-sm font-bold text-navy-800 hover:bg-surface"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold">Delete appointment</h2>
            <p className="text-sm">Kya aap ye appointment delete karna chahte ho?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteData(null)} className="rounded-xl px-4 py-2.5 text-sm font-bold">Cancel</button>
              <button onClick={deleteAppointment} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminAppointments