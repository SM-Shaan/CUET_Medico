import React, { useEffect, useState } from 'react';

const ManageHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [newHospital, setNewHospital] = useState({ name: '', location: '' });

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/hospitals');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHospitals(data);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    const handleAddHospital = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/hospitals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newHospital),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const addedHospital = await response.json();
            setHospitals([...hospitals, addedHospital]);
            setNewHospital({ name: '', location: '' }); // Reset form
        } catch (error) {
            console.error('Error adding hospital:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Manage Hospitals</h1>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Add New Hospital</h2>
                <input
                    type="text"
                    placeholder="Hospital Name"
                    value={newHospital.name}
                    onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={newHospital.location}
                    onChange={(e) => setNewHospital({ ...newHospital, location: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddHospital} className="bg-blue-600 text-white px-4 py-2 rounded">Add Hospital</button>
            </div>
            <ul className="space-y-4">
                {hospitals.map(hospital => (
                    <li key={hospital.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl">{hospital.name}</h2>
                        <p>Location: {hospital.location}</p>
                        {/* Add edit and delete functionality here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageHospitals; 