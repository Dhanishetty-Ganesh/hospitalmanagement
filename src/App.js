// App.js
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HospitalAdmin from './components/HospitalAdmin';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import PatientsList from './components/PatientsList'; // ✅ Import new component

const AppLayout = () => {
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {/* ✅ Show Navbar only if logged in and not on /auth */}
      {isLoggedIn && !isAuthPage && <Navbar />}

      <Routes>
        {/* ✅ Auth Route (Login/Register Combined) */}
        <Route path="/auth" element={<RegistrationForm />} />

        {/* ✅ Role-Based Routes */}
        <Route
          path="/admin"
          element={isLoggedIn && userRole === 'admin' ? <HospitalAdmin /> : <Navigate to="/auth" />}
        />
        <Route
          path="/doctor"
          element={isLoggedIn && userRole === 'doctor' ? <Doctor /> : <Navigate to="/auth" />}
        />
        <Route
          path="/patient"
          element={isLoggedIn && userRole === 'patient' ? <Patient /> : <Navigate to="/auth" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />}
        />

        {/* ✅ Patients List: Only for Admin & Doctor */}
        <Route
          path="/patients"
          element={
            isLoggedIn && (userRole === 'admin' || userRole === 'doctor') ? (
              <PatientsList />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* ✅ Public Landing Page */}
        <Route path="/home" element={<LandingPage />} />

        {/* ✅ Fallback: Redirect unknown routes to /auth */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
