import { useEffect, useState } from 'react'
import axios from 'axios'
import ProfilePage from '../components/ProfilePage'

// form fields shown on the profile page (password is changed via /update-password)
// NOTE: specialization options must match your doctor model enum exactly
const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Dr. John Doe', full: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'doctor@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '03001234567' },
  { name: 'specialization', label: 'Specialization', options: ['General Physician', 'Dermatlogist', 'Cardialogist', 'ENT', 'Phychologist', 'Dentist'] },
  { name: 'license', label: 'License number', placeholder: 'PMDC-12345' },
  { name: 'age', label: 'Age', type: 'number', placeholder: '35' },
  { name: 'experience', label: 'Experience (years)', type: 'number', placeholder: '10' },
]

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null) // whole doctor object from the API

  useEffect(() => {
    const getDoctorProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/doctor/profile', {
          withCredentials: true,
        })
        setDoctor(data.doctor)
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    }

    getDoctorProfile()
  }, [])

  // Save button -> formData = { name, email, phone, specialization, license, age, experience }
  const handleSave = async (formData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/doctor/update/${doctor._id}`,
        formData,
        { withCredentials: true }
      )
      setDoctor(data.doctor)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  if (!doctor) return <p className="text-sm text-navy-800/60">Loading...</p>

  return (
    <ProfilePage
      name={doctor.name}
      role={doctor.specialization}
      email={doctor.email}
      fields={fields}
      values={doctor}
      onSubmit={handleSave}
    />
  )
}

export default DoctorProfile