import React, { useState } from 'react';
import { FaClipboardList, FaBookMedical, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [selectedEntry, setSelectedEntry] = useState(null);

    const patientInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+880 123 456 789",
        bookletId: "B123456",
        department: "Cardiology",
        hallName: "Main Hall",
        roomName: "Room 101",
        batch: "2023",
    };

    const upcomingAppointments = [
        { date: "2023-10-05", time: "10:00 AM", doctor: "Dr. Jane Smith", instructions: "Bring your ID and insurance card." },
        { date: "2023-10-12", time: "2:30 PM", doctor: "Dr. John Doe", instructions: "Prepare your medical history." },
    ];

    const bookletEntries = [
        { date: "2023-09-15", visitType: "General Consultation", notes: "Routine check-up.", medications: ["Lisinopril - 10 mg", "Metformin - 500 mg"] },
        { date: "2023-08-20", visitType: "Cardiology Consultation", notes: "Follow-up on heart condition.", medications: ["Atenolol - 50 mg"] },
    ];

    const handleEntryClick = (entry) => {
        setSelectedEntry(entry);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

            {/* Personal Information Section */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                <p><strong>Name:</strong> {patientInfo.name}</p>
                <p><strong>Email:</strong> {patientInfo.email}</p>
                <p><strong>Phone:</strong> {patientInfo.phone}</p>
                <p><strong>Booklet ID:</strong> {patientInfo.bookletId}</p>
                <p><strong>Department:</strong> {patientInfo.department}</p>
                <p><strong>Hall Name:</strong> {patientInfo.hallName}</p>
                <p><strong>Room Name:</strong> {patientInfo.roomName}</p>
                <p><strong>Batch:</strong> {patientInfo.batch}</p>
            </section>

            {/* Upcoming Appointments Section */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
                <ul className="space-y-2">
                    {upcomingAppointments.map((appointment, index) => (
                        <li key={index} className="flex justify-between items-center p-2 border-b">
                            <span className="text-lg">{appointment.date} at {appointment.time}</span>
                            <span className="text-gray-600">With {appointment.doctor}</span>
                            <span className="text-gray-600">{appointment.instructions}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Booklet Section */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Your Medical Booklet</h2>
                <ul className="space-y-2">
                    {bookletEntries.map((entry, index) => (
                        <li key={index} className="border p-4 rounded mb-2 cursor-pointer" onClick={() => handleEntryClick(entry)}>
                            <h3 className="font-semibold">{entry.visitType} on {entry.date}</h3>
                            <p className="text-gray-600">Notes: {entry.notes}</p>
                            <p className="text-gray-600">Medications: {entry.medications.join(", ")}</p>
                        </li>
                    ))}
                </ul>
                <Link to="/medical-history" className="text-blue-600 hover:underline mt-4 block">See All</Link>
            </section>

            {/* Detailed Entry Modal */}
            {selectedEntry && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Details for {selectedEntry.visitType}</h2>
                        <p><strong>Date:</strong> {selectedEntry.date}</p>
                        <p><strong>Notes:</strong> {selectedEntry.notes}</p>
                        <p><strong>Medications:</strong> {selectedEntry.medications.join(", ")}</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setSelectedEntry(null)}>Close</button>
                    </div>
                </div>
            )}

            {/* Resources Section */}
            <section className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Health Resources</h2>
                <p className="text-gray-600">Access important resources to help you manage your health:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><a href="/health-tips" className="text-blue-600 hover:underline">Health Tips</a></li>
                    <li><a href="/patient-education" className="text-blue-600 hover:underline">Patient Education Materials</a></li>
                    <li><a href="/support-services" className="text-blue-600 hover:underline">Support Services</a></li>
                </ul>
            </section>
        </div>
    );
};

export default StudentDashboard;