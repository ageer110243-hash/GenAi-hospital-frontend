
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import Home from './pages/Home'

// auth
import PatientSignUp from './pages/patient/auth/PatientSignUp'
import PatientLogin from './pages/patient/auth/PatientLogin'
import DoctorSignUp from './pages/doctor/auth/DoctorSignUp'
import DoctorLogin from './pages/doctor/auth/DoctorLogin'
import AdminSignUp from './pages/admin/auth/AdminSignUp'
import AdminLogin from './pages/admin/auth/AdminLogin'

// Protected Route
import ProtectedRoute from './components/ProjectedRoute'

// admin dashboard
import AdminDashboard from './pages/admin/dashboard/AdminDashboard'
import AdminOverview from './pages/admin/dashboard/pages/AdminOverview'
import AdminDoctors from './pages/admin/dashboard/pages/AdminDoctors'
import AdminPatients from './pages/admin/dashboard/pages/AdminPatients'
import AdminAppointments from './pages/admin/dashboard/pages/AdminAppointments'
import AdminProfile from './pages/admin/dashboard/pages/AdminProfile'

// doctor dashboard
import DoctorDashboard from './pages/doctor/dashboard/DoctorDashboard'
import DoctorOverview from './pages/doctor/dashboard/pages/DoctorOverview'
import DoctorPatients from './pages/doctor/dashboard/pages/DoctorPatients'
import DoctorAppointments from './pages/doctor/dashboard/pages/DoctorAppointments'
import DoctorProfile from './pages/doctor/dashboard/pages/DoctorProfile'

// patient dashboard
import PatientDashboard from './pages/patient/dashboard/PatientDashboard'
import PatientOverview from './pages/patient/dashboard/pages/PatientOverview'
import BookAppointment from './pages/patient/dashboard/pages/BookAppointment'
import PreviousAppointments from './pages/patient/dashboard/pages/PreviousAppointments'
import MedicalReports from './pages/patient/dashboard/pages/MedicalReports'
import PatientProfile from './pages/patient/dashboard/pages/PatientProfile'

function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/patient-signup" element={<PatientSignUp />} />
        <Route path="/patient-login" element={<PatientLogin />} />

        <Route path="/doctor-signup" element={<DoctorSignUp />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />

        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Route>

      {/* Admin Protected Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin" redirectTo="/admin-login">
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Doctor Protected Dashboard */}
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute allowedRole="doctor" redirectTo="/doctor-login">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorOverview />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      {/* Patient Protected Dashboard */}
      <Route
        path="/patient-dashboard"
        element={
          <ProtectedRoute allowedRole="patient" redirectTo="/patient-login">
            <PatientDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientOverview />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="previous-appointments" element={<PreviousAppointments />} />
        <Route path="reports" element={<MedicalReports />} />
        <Route path="profile" element={<PatientProfile />} />
      </Route>

    </Routes>
  )
}

export default App
