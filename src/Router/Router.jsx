import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import OnlineAppointmentPage from "../pages/AppointmentSchedulingPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AppointmentOverview from "../pages/dashboard/Appointment";
import AppointmentDetailsPage from "../pages/dashboard/AppointmentDetails";
import StudentBooklet from "../pages/dashboard/Booklet";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DoctorDashboard from "../pages/dashboard/DoctorDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import Appointments from "../pages/Appointments";
import Doctors from "../pages/Doctors";
import ContactPage from "../pages/Contact";
import SignupForm from "../pages/Signup";
import Login from "../pages/Login";
import MedicalHistoryPage from "../pages/MedicalHistoryPage";


const RoleBasedRoute = ({ children, allowedRoles }) => {
  const role = useUserRole();

  if (!role) {
    return <p>Loading...</p>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const useUserRole = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userRole = user['https://myapp.example.com/'][0];
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [getAccessTokenSilently, user]);

  return role;
};

const USER_ROLES = {
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  STUDENT: 'Student',
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      {
        path: "/dashmenu/*", element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardHome /> },
          { path: "appointmentsView", element: <AppointmentOverview /> },
          // { path: "appointment/:id", element: <AppointmentDetailsPage /> },
          { path: "booklet", element: <StudentBooklet /> },
          { path: "admin", element: <AdminDashboard /> },
          { path: "doctor", element: <DoctorDashboard /> },
          { path: "student", element: <StudentDashboard /> },
          { path: "*", element: <div>404 Not Found</div> }
        ]
      }, 
      { path: "/appointments", element: <OnlineAppointmentPage /> },
      { path: "/appointmentform", element: <Appointments /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignupForm /> },
      { path: "/medical-history", element: <MedicalHistoryPage /> },
    ]
  }
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/home", element: <Home />
//       },
//     //   {
//     //     path: "/dashmenu/*", element: <DashboardLayout />,
//     //     children: [
//     //         { path: "/dashboard", element: <DashboardHome /> },
//     //         { path: "/appointments", element: <AppointmentOverview /> },
//     //         { path: "/appointment/:id", element: <AppointmentDetailsPage /> },
//     //         { path: "/booklet", element: <StudentBooklet /> },
//     //         { path: "/admin", element: <AdminDashboard /> },
//     //         { path: "/doctor", element: <DoctorDashboard /> },
//     //         { path: "/student", element: <StudentDashboard /> },
//     //         { path: "*", element: <div>404 Not Found</div> }
//     //     ]
//     //   },
//       { path: "*", element: <div>404 Not Found</div> },
//       { path: "/appointments", element: <OnlineAppointmentPage /> },
//       { path: "/appointmentform", element: <Appointments /> },
//       { path: "/doctors", element: <Doctors /> },
//       { path: "/contact", element: <ContactPage /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <SignupForm /> },
//       { }
//     ],
//   },
// ]);

export default router; 