

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); // Added state for errors

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //         const res = await fetch('http://localhost:3000/api/appointmentform');
          
  //         if (!res.ok) {
  //             throw new Error(`HTTP error! Status: ${res.status}`);
  //         }
          
  //         const data = await res.json();  // This will now be a JSON response
  //         console.log(data);  // { message: "Server is running!" }
  //         setItems([data.message]);  // Set the message in your state or UI
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setError(error.message);  // Set the error message in state
  //     }
  // };
  

  //   fetchData(); // Call the async function
  // }, []);
  return (
    <div>
      <Navbar />
      {/* {error && <div className="error">Error: {error}</div>}   */}
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