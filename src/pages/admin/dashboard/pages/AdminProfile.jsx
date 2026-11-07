import { useEffect, useState } from 'react'
import axios from 'axios'
import ProfilePage from '../components/ProfilePage'

// form fields shown on the profile page
// (password is NOT here: change it through the /update-password route instead)
const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Admin name', full: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'admin@example.com', full: true },
]

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null) // whole admin object from the API
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', text }

  useEffect(() => {
    const getAdminProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/admin/profile', {
          withCredentials: true,
        })
        setAdmin(data.admin)
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    }

    getAdminProfile()
  }, [])

  // "Save changes" button -> formData = { name, email }
  // return true when it worked, false when it failed
  const handleSave = async (formData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/admin/update/${admin._id}`,
        formData,
        { withCredentials: true }
      )
      setAdmin(data.admin)
      setStatus({ type: 'success', text: 'Profile updated successfully' })
      return true
    } catch (error) {
      console.log(error.response?.data || error.message)
      setStatus({ type: 'error', text: error.response?.data?.message || 'Could not update profile' })
      return false
    }
  }

  if (!admin) return <p className="text-sm text-navy-800/60">Loading...</p>

  return (
    <ProfilePage
      name={admin.name}
      role="admin"
      email={admin.email}
      fields={fields}
      values={admin}
      onSubmit={handleSave}
      status={status}
      onEditStart={() => setStatus(null)}
    />
  )
}

export default AdminProfile