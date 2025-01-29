import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../DashboardSidebar';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex">
            {isSidebarOpen && <DashboardSidebar />}
            <div className="flex-1 p-6 bg-gray-100">
                <button 
                    className="md:hidden mb-4 p-2 bg-blue-600 text-white rounded transition duration-200 hover:bg-blue-700" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
                </button>
                <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
                <Outlet /> {/* This will render the child routes */}
            </div>
        </div>
    );
};

export default DashboardLayout;