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
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const getPatientProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/patient/profile', {
          withCredentials: true,
        })
        setProfile({
          name: data.patient.name,
          role: 'Patient',
          email: data.patient.email,
        })
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    }

    getPatientProfile()
  }, [])

  if (!profile) return <p className="text-sm text-navy-800/60">Loading...</p>

  return <ProfilePage name={profile.name} role={profile.role} email={profile.email} fields={fields} />
}

export default PatientProfile