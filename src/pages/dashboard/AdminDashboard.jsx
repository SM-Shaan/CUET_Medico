import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        totalDoctors: 10, // Dummy data
        totalStudents: 50, // Dummy data
        totalHospitals: 5, // Dummy data
    });
    const [reports, setReports] = useState([
        { activity: "Added a new doctor: Dr. Jane Smith", date: "2023-10-01" },
        { activity: "Updated student information for John Doe", date: "2023-10-02" },
        { activity: "Registered a new student: Alice Brown", date: "2023-10-04" },
    ]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the Admin Dashboard. Here you can manage doctors, students, and view reports.</p>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Total Doctors</h2>
                    <p className="text-2xl">{metrics.totalDoctors}</p>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Total Students</h2>
                    <p className="text-2xl">{metrics.totalStudents}</p>
                </div>
                <div className="bg-yellow-500 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Total Hospitals</h2>
                    <p className="text-2xl">{metrics.totalHospitals}</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Recent Activities</h2>
                <ul className="space-y-2">
                    {reports.map((report, index) => (
                        <li key={index} className="border p-2 rounded">
                            {report.activity} - {report.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard; 