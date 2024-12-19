import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import './index.css';
import Doctors from './pages/Doctors';
import ContactPage from './pages/Contact';
import AppointmentOverview from './pages/dashboard/Appointment';
import AppointmentDetailsPage from './pages/dashboard/AppointmentDetails';
import OnlineAppointmentPage from './pages/AppointmentSchedulingPage';
import StudentBooklet from './pages/dashboard/Booklet';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="min-h-screen">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/appointments" element={<OnlineAppointmentPage />} />
                  <Route path="/appointmentform" element={<Appointments />} />
                  <Route path="*" element={<div>404 Not Found</div>} />
                  <Route path="/doctors" element={<Doctors />} />
                  {/* <Route path="/blog" element={<div>Blog</div>} /> */}
                  <Route path="/contact" element={<ContactPage/>} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="appointments" element={<AppointmentOverview />} />
                <Route path="*" element={<div>404 Not Found</div>} />
                <Route path="/appointmentdetails" element={<AppointmentDetailsPage/>} />
                <Route path='/bookletlist' element={<StudentBooklet/>} />
                {/* Add other dashboard routes here */}

              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;