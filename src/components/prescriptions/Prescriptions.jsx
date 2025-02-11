// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Prescriptions = ({ appointmentId }) => {
//     const [prescription, setPrescription] = useState('');

//     useEffect(() => {
//         const fetchPrescription = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/appointments/${appointmentId}`);
//                 setPrescription(response.data.prescription);
//             } catch (error) {
//                 console.error('Error fetching prescription', error);
//             }
//         };
//         fetchPrescription();
//     }, [appointmentId]);

//     return (
//         <div>
//             <h2>Prescription</h2>
//             <p>{prescription}</p>
//         </div>
//     );
// };

// export default Prescriptions;

import React, { useState } from 'react';
// import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
const AddPrescription = ({ appointment }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [prescription, setPrescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.post(
            `/api/appointments/${appointment._id}/prescription`,
            { prescription },
            {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          // Handle response
        } catch (error) {
          console.error('Error:', error.response?.data || error.message);
        }
      };      
    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Add Prescription</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter prescription details..."
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Save Prescription
                </button>
            </form>
        </div>
    );
};
export default AddPrescription;