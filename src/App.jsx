import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* This ensures pages are rendered inside App */}
    </div>
  );
}

export default App;




// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Appointments from './pages/Appointments';
// import DashboardLayout from './components/dashboard/DashboardLayout';
// import DashboardHome from './pages/dashboard/DashboardHome';
// import Doctors from './pages/Doctors';
// import ContactPage from './pages/Contact';
// import AppointmentOverview from './pages/dashboard/Appointment';
// import AppointmentDetailsPage from './pages/dashboard/AppointmentDetails';
// import OnlineAppointmentPage from './pages/AppointmentSchedulingPage';
// import StudentBooklet from './pages/dashboard/Booklet';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import DoctorDashboard from './pages/dashboard/DoctorDashboard';
// import StudentDashboard from './pages/dashboard/StudentDashboard';

// <Router>
    //   <Routes>
    //     {/* Public routes */}
    //     <Route
    //       path="*"
    //       element={
    //         <>
    //           <Navbar />
    //           <main className="min-h-screen">
    //             <Routes>
    //               <Route index element={<Home />} />
    //               <Route path="/appointments" element={<OnlineAppointmentPage />} />
    //               <Route path="/appointmentform" element={<Appointments />} />
    //               <Route path="/doctors" element={<Doctors />} />
    //               <Route path="/contact" element={<ContactPage />} />
    //               <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
    //               <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
    //               <Route path="*" element={<div>404 Not Found</div>} />
    //             </Routes>
    //           </main>
    //           <Footer />
    //         </>
    //       }
    //     />

    //     {/* Dashboard routes */}
    //     <Route
    //       path="/dashboard/*"
    //       element={
    //         <>
    //           <Navbar />
    //           <main className="min-h-screen">
    //             <DashboardLayout>
    //               <Routes>
    //                 <Route index element={<DashboardHome />} />
    //                 <Route path="appointments" element={<AppointmentOverview />} />
    //                 <Route path="/appointmentdetails" element={<AppointmentDetailsPage />} />
    //                 <Route path='/bookletlist' element={<StudentBooklet />} />
    //                 <Route path="/dashboard/admin" element={<AdminDashboard />} />
    //                 <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
    //                 <Route path="/dashboard/student" element={<StudentDashboard />} />
    //                 <Route path="*" element={<div>404 Not Found</div>} />
    //               </Routes>
    //             </DashboardLayout>
    //           </main>
    //           <Footer />
    //         </>
    //       }
    //     />
    //   </Routes>
    // </Router>