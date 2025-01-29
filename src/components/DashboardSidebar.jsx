import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBook, FaUserShield, FaUserMd, FaUserGraduate } from 'react-icons/fa';

const navItems = [
    { to: "/dashmenu/dashboard", icon: <FaHome className="mr-3" />, label: "Admin Dashboard" },
    { to: "/dashmenu/appointmentsView", icon: <FaCalendarAlt className="mr-3" />, label: "Appointments" },
    { to: "/dashmenu/booklet", icon: <FaBook className="mr-3" />, label: "Booklet" },
    { to: "/dashmenu/doctor", icon: <FaUserMd className="mr-3" />, label: "Doctor Dashboard" },
    { to: "/dashmenu/student", icon: <FaUserGraduate className="mr-3" />, label: "Student Dashboard" },
];

const DashboardSidebar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white h-full p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Navigation</h2>
            <ul>
                {navItems.map((item, index) => (
                    <li key={index} className="mb-4">
                        <NavLink 
                            to={item.to} 
                            className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-600' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardSidebar;
