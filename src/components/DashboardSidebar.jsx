import React, { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBook, FaUserShield, FaUserMd, FaUserGraduate, FaHospital, FaChartLine, FaCog, FaFileMedical, FaFlask, FaUser, FaPhone, FaClinicMedical, FaPills, FaMicroscope, FaAmbulance } from 'react-icons/fa';
// import ExpandablePanel from './ExpandablePanel';
import { useAuth0 } from '@auth0/auth0-react';
// import './DashboardSidebar.css'; // Ensure this file exists in the same directory


const navItems = [
// 🔹 Admin Panel 
{ path: "dashboard", icon: <FaHome className="mr-3" />, label: "Admin Dashboard", roles: ['Admin'] },
{ path: "/dashmenu/appointmentsView", icon: <FaCalendarAlt className="mr-3" />, label: "Appointments", roles: ['Admin'] }, 
{ path: "/dashmenu/doctor-info", icon: <FaUserShield className="mr-3" />, label: "Doctor Info", roles: ['Admin'] },      
{ path: "/dashmenu/add-doctor", icon: <FaUserShield className="mr-3" />, label: "Add Doctor", roles: ['Admin'] },       
{ path: "/dashmenu/admin/manage-students", icon: <FaUserGraduate className="mr-3" />, label: "Manage Students", roles: ['Admin'] },
{ path: "/dashmenu/admin/booklet", icon: <FaBook className="mr-3" />, label: "Booklet", roles: ['Admin'] }, 
{ path: "/dashmenu/admin/settings", icon: <FaCog className="mr-3" />, label: "Settings" , roles: ['Admin']},

// 🔹 Doctor Panel 
{ path: "/dashmenu/doctor", icon: <FaUserMd className="mr-3" />, label: "Doctor Dashboard" , roles: ['Doctor']},
{ path: "/dashmenu/doctor/my-patients", icon: <FaUserGraduate className="mr-3" />, label: "My Patients" , roles: ['Doctor']}, 
{ path: "/dashmenu/doctor/patient-history", icon: <FaBook className="mr-3" />, label: "Patient History" , roles: ['Doctor']}, 
{ path: "/dashmenu/doctor/prescriptions", icon: <FaFileMedical className="mr-3" />, label: "Prescriptions" , roles: ['Doctor']}, // NEW
{ path: "/dashmenu/doctor/lab-requests", icon: <FaFlask className="mr-3" />, label: "Lab Test Requests" , roles: ['Doctor']}, // NEW
{ path: "/dashmenu/doctor/settings", icon: <FaCog className="mr-3" />, label: "Settings" , roles: ['Doctor']},

// 🔹 Student (Patient) Panel
{ path: "/dashmenu/student", icon: <FaUserGraduate className="mr-3" />, label: "Student Dashboard", roles: ['Student'] },  
{ path: "/dashmenu/student/my-appointments", icon: <FaCalendarAlt className="mr-3" />, label: "My Appointments" , roles: ['Student']}, 
{ path: "/dashmenu/student/my-profile", icon: <FaUser className="mr-3" />, label: "My Profile" , roles: ['Student']}, 
{ path: "/dashmenu/student/medical-history", icon: <FaBook className="mr-3" />, label: "My Medical History" , roles: ['Student']}, 
{ path: "/dashmenu/doctor/reports", icon: <FaCalendarAlt className="mr-3" />, label: "Reports" , roles: ['Student']},
{ path: "/dashmenu/student/prescriptions", icon: <FaFileMedical className="mr-3" />, label: "My Prescriptions" , roles: ['Student']}, // NEW
{ path: "/dashmenu/student/lab-results", icon: <FaFlask className="mr-3" />, label: "Lab Results" , roles: ['Student']}, // NEW
{ path: "/dashmenu/student/contact", icon: <FaPhone className="mr-3" />, label: "Contact Support" , roles: ['Student']}, 
];

const DashboardSidebar = () => {
    // const [isSticky, setSticky] = useState(false);
    const {user} = useAuth0();
    const namespace = 'https://5173/';
    const userRoles = user?.[`${namespace}roles`] || []; 
     useEffect(() => {
        const handleScroll = () => {
          // navigate('/home', { replace: true });
          const offset = window.scrollY;
          setSticky(offset > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll); 
        };
      }, [Navigate]);
      const hasRole = (roles) => roles?.some(role => userRoles.includes(role));

    return (
        <div className="w-64 bg-gray-900 text-white h-full p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Navigation</h2>
            {/* <ExpandablePanel title="Admin Panel"> */}
                    {navItems.map((item, index, roles) => (
                        (!item.roles || hasRole(item.roles)) && (
                        <NavLink 
                            key={index} 
                            to={item.path} 
                            className={({ isActive }) => `flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-600' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                        )
                    ))}
        </div>
    );
};

export default DashboardSidebar;


