import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DoctorInfoDashboard = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-doctors');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            await fetch(`http://localhost:5000/api/doctors/${id}`, {
                method: 'DELETE',
            });
            setDoctors(doctors.filter(doctor => doctor.id !== id));
        }
    }; 

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Doctor Information Dashboard</h1>
            <Link to="/add-doctor" className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Add New Doctor</Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Designation</th>
                        <th className="border px-4 py-2">Rating</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Weekdays</th>
                        <th className="border px-4 py-2">Availability</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td className="border px-4 py-2">
                                {doctor.image ? (
                                    <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">No Image</div>
                                )}
                            </td>
                            <td className="border px-4 py-2">{doctor.name}</td>
                            <td className="border px-4 py-2">{doctor.designation}</td>
                            <td className="border px-4 py-2">{doctor.rating} Stars</td>
                            <td className="border px-4 py-2">{doctor.phone}</td>
                            <td className="border px-4 py-2">{doctor.email}</td>
                            <td className="border px-4 py-2">{doctor.weekdays.join(', ')}</td>
                            <td className="border px-4 py-2">
                                {doctor.weekdays.map(day => (
                                    <div key={day}>
                                        <strong>{day}:</strong> {doctor.availability[day]}
                                    </div>
                                ))}
                            </td>
                            <td className="border px-4 py-2">
                                <Link to={`/edit-doctor/${doctor.id}`} className="text-blue-600"><FaEdit /></Link>
                                <button onClick={() => handleDelete(doctor.id)} className="text-red-600 ml-2"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorInfoDashboard; 