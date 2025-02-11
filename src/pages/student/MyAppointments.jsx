import React, { useEffect, useState } from 'react';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/appointments'); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">My Appointments</h1>
            <ul className="space-y-4">
                {appointments.map(appointment => (
                    <li key={appointment.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl">{appointment.date} at {appointment.time}</h2>
                        <p>Doctor: {appointment.doctor}</p>
                        <p>Status: {appointment.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyAppointments; 