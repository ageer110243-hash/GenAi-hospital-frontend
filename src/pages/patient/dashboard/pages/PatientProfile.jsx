import { useEffect, useState } from 'react'
import axios from 'axios'
import ProfilePage from '../components/ProfilePage'

// form fields shown on the profile page (password is changed via /update-password)
const fields = [
  { name: 'name', label: 'Full name', placeholder: 'John Doe', full: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '03001234567' },
  { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'] },
  { name: 'age', label: 'Age', type: 'number', placeholder: '25' },
  { name: 'bloodGroup', label: 'Blood group', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  { name: 'disease', label: 'Disease / Condition', placeholder: 'e.g. Diabetes' },
]

const PatientProfile = () => {
  const [patient, setPatient] = useState(null) // whole patient object from the API
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', text }

  useEffect(() => {
    const getPatientProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/patient/profile', {
          withCredentials: true,
        })
        setPatient(data.patient)
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    }

    getPatientProfile()
  }, [])

  // "Save changes" button -> formData = { name, email, phone, gender, age, bloodGroup, disease }
  // return true when it worked, false when it failed
  const handleSave = async (formData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/patient/patient-update/${patient._id}`,
        formData,
        { withCredentials: true }
      )
      setPatient(data.patient)
      setStatus({ type: 'success', text: 'Profile updated successfully' })
      return true
    } catch (error) {
      console.log(error.response?.data || error.message)
      setStatus({ type: 'error', text: error.response?.data?.message || 'Could not update profile' })
      return false
    }
  }

  if (!patient) return <p className="text-sm text-navy-800/60">Loading...</p>

  return (
    <ProfilePage
      name={patient.name}
      role="Patient"
      email={patient.email}
      fields={fields}
      values={patient}
      onSubmit={handleSave}
      status={status}
      onEditStart={() => setStatus(null)}
    />
  )
}

export default PatientProfile