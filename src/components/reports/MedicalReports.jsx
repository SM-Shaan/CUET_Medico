// filepath: /C:/Users/Shaan/Downloads/Telegram Desktop/CUET_Medico/CUET_Medico/src/components/prescriptions/AddPrescription.jsx
import React, { useState } from 'react';
// import axios from 'axios';

const AddPrescription = ({ appointmentId }) => {
    const [prescription, setPrescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/addPrescription', { appointmentId, prescription });
            alert(response.data.message);
        } catch (error) {
            alert('Error adding prescription');
        }
    };

    return (
        <div>
            <h2>Add Prescription</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Prescription"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    required
                />
                <button type="submit">Add Prescription</button>
            </form>
        </div>
    );
};

export default AddPrescription;