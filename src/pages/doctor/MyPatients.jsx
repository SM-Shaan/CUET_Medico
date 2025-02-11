import React, { useEffect, useState } from 'react';

const MyPatients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/patients'); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">My Patients</h1>
            <ul className="space-y-4">
                {patients.map(patient => (
                    <li key={patient.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl">{patient.name}</h2>
                        <p>Email: {patient.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPatients; 