import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        fetchDoctor();
    }, [id]);

    if (!doctor) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full" />
            <p>Designation: {doctor.designation}</p>
            <p>Rating: {doctor.rating} Stars</p>
            <p>Phone: {doctor.phone}</p>
            <p>Email: {doctor.email}</p>
            <h2>Availability</h2>
            <ul>
                {doctor.weekdays.map(day => (
                    <li key={day}>
                        <strong>{day}:</strong> {doctor.availability[day]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorProfile; 