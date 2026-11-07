import ProfilePage from '../../../components/dashboard/ProfilePage'

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Dr. John Doe', full: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'doctor@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '03001234567' },
  { name: 'specialization', label: 'Specialization', options: ['General Physician', 'Dermatologist', 'Cardiologist', 'ENT', 'Psychologist', 'Dentist'] },
  { name: 'license', label: 'License number', placeholder: 'PMDC-12345' },
  { name: 'age', label: 'Age', type: 'number', placeholder: '35' },
  { name: 'experience', label: 'Experience (years)', type: 'number', placeholder: '10' },
]

const DoctorProfile = () => (
  <ProfilePage name="Dr. Ayesha Khan" role="Cardiologist" email="ayesha@aurelia.com" fields={fields} />
)

export default DoctorProfile
