import React from 'react';
import { FaUser, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

const DoctorDashboard = () => {
    const patients = [
        { name: "Sarah Rahman", time: "10:00 AM", date: "2023-10-01" },
        { name: "Ahmed Hossain", time: "11:30 AM", date: "2023-10-01" },
        { name: "Emily Johnson", time: "1:00 PM", date: "2023-10-01" },
    ];

    const upcomingAppointments = [
        { patient: "John Doe", date: "2023-10-02", time: "9:00 AM" },
        { patient: "Jane Smith", date: "2023-10-03", time: "10:30 AM" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

            {/* Patient List Section */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Today's Patients</h2>
                <ul className="space-y-2">
                    {patients.map((patient, index) => (
                        <li key={index} className="flex justify-between items-center p-2 border-b">
                            <span className="text-lg">{patient.name}</span>
                            <span className="text-gray-600">{patient.time}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Upcoming Appointments Section */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
                <ul className="space-y-2">
                    {upcomingAppointments.map((appointment, index) => (
                        <li key={index} className="flex justify-between items-center p-2 border-b">
                            <span className="text-lg">{appointment.patient}</span>
                            <span className="text-gray-600">{appointment.date} at {appointment.time}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Notifications Section */}
            <section className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                <p className="text-gray-600">You have 2 new messages from the administration.</p>
            </section>
        </div>
    );
};

export default DoctorDashboard; 