import React, { useEffect, useState } from 'react';

const PatientHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/patient-history'); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('Error fetching patient history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Patient History</h1>
            <ul className="space-y-4">
                {history.map(entry => (
                    <li key={entry.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl">{entry.date}</h2>
                        <p>Visit Type: {entry.visitType}</p>
                        <p>Notes: {entry.notes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientHistory; 