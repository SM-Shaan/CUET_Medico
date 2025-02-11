import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Prescription from '../../components/prescriptions/Prescriptions';
import MedicalReports from '../../components/reports/MedicalReports';
const AppointmentDetails = () => {
    const { id } = useParams();
    const { getAccessTokenSilently, user } = useAuth0();
    const [appointment, setAppointment] = useState(null);
    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get(`/api/appointments/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointment(response.data);
            } catch (error) {
                console.error('Error fetching appointment:', error);
            }
        };
        fetchAppointment();
    }, [id, getAccessTokenSilently]);
    if (!appointment) return <div>Loading...</div>;
    return (
        <div className="container mx-auto p-4">
            {/* Keep your existing styling and structure */}
            <div className="h-full">
                <div className="bg-white shadow rounded-lg p-10">
                    {/* Existing appointment details display */}
                    {/* Add new features from Step 9 */}
                    {appointment.doctorId._id === user.sub && (
                        <AddPrescription appointment={appointment} />
                    )}
                    {appointment.prescription && (
                        <div className="my-4 p-4 bg-gray-50 rounded">
                            <h2 className="text-xl font-semibold mb-2">Prescription</h2>
                            <Prescription prescription={appointment.prescription} />
                        </div>
                    )}
                    {appointment.patientId === user.sub && (
                        <UploadMedicalReport appointment={appointment} />
                    )}
                    <MedicalReports reports={appointment.medicalReports} />
                </div>
            </div>
        </div>
    );
};
export default AppointmentDetails;




// import React from "react";

// const AppointmentDetails = ({ appointment }) => {
//   if (!appointment) {
//     return <div className="p-6">No appointment selected.</div>;
//   }

//   return (
//     <div className="h-full">
//       <div className="bg-white shadow rounded-lg p-10">
//         <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Appointment Overview</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Patient Information */}
//           <div className="bg-blue-40 p-6 rounded-lg shadow">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-700">Patient Information</h2>
//             <p className="text-gray-700">
//               <strong>Name:</strong> {appointment.patientName}
//             </p>
//             <p className="text-gray-700">
//               <strong>Age:</strong> {appointment.patientAge}
//             </p>
//             <p className="text-gray-700">
//               <strong>Contact:</strong> {appointment.patientContact}
//             </p>
//           </div>

//           {/* Appointment Information */}
//           <div className="bg-blue-40 p-6 rounded-lg shadow">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-700">Appointment Information</h2>
//             <p className="text-gray-700">
//               <strong>Doctor:</strong> {appointment.doctor}
//             </p>
//             <p className="text-gray-700">
//               <strong>Date:</strong> {appointment.date}
//             </p>
//             <p className="text-gray-700">
//               <strong>Time:</strong> {appointment.time}
//             </p>
//             <p className="text-gray-700">
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`px-2 py-1 rounded ${
//                   appointment.status === "Pending"
//                     ? "bg-yellow-200 text-yellow-800"
//                     : appointment.status === "Completed"
//                     ? "bg-green-200 text-green-800"
//                     : "bg-red-200 text-red-800"
//                 }`}
//               >
//                 {appointment.status}
//               </span>
//             </p>
//             <p className="text-gray-700">
//               <strong>Appointment Type:</strong>{" "}
//               <span
//                 className={`px-2 py-1 rounded ${
//                   appointment.type === "Online"
//                     ? "bg-blue-200 text-blue-800"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {appointment.type}
//               </span>
//             </p>
//           </div>
          
//           {/* Prescription */}
//           {appointment.prescription && (
//             <div className="bg-blue-40 p-6 rounded-lg shadow mt-8">
//               <h2 className="text-2xl font-semibold mb-4 text-blue-700">Prescription</h2>
//               <ul className="list-disc pl-6 text-gray-700">
//                 {appointment.prescription.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Cancellation Reasons */}
//           {appointment.status === "Canceled" && (
//             <div className="bg-blue-40 p-6 rounded-lg shadow mt-8">
//               <h2 className="text-2xl font-semibold mb-4 text-blue-700">Reason for Cancellation</h2>
//               <p className="text-gray-700">{appointment.cancellationReason || "No reason provided."}</p>
//             </div>
//           )}

//           {/* Patient Reviews */}
//           {appointment.reviews && (
//             <div className="bg-blue-40 p-6 rounded-lg shadow mt-8">
//               <h2 className="text-2xl font-semibold mb-4 text-blue-700">Patient Reviews</h2>
//               <p className="text-gray-700">{appointment.reviews}</p>
//             </div>
//           )}

//           {/* Appointment Duration */}
//           <div className="bg-blue-40 p-6 rounded-lg shadow mt-8">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-700">Appointment Duration</h2>
//             <p className="text-gray-700">{appointment.duration || "Not specified."}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Example data to pass as a prop
// const exampleAppointment = {
//   id: 1,
//   patientName: "John Doe",
//   patientAge: 32,
//   patientContact: "+123456789",
//   doctor: "Dr. Smith",
//   date: "2024-12-20",
//   time: "10:00 AM",
//   status: "Completed",
//   duration: "30 minutes",
//   cancellationReason: null,
//   prescription: ["Paracetamol 500mg - Twice a day", "Cough Syrup - Once a day"],
//   reviews: "The doctor was very professional and helpful.",
//   type: "Online", // Can be "Online" or "Offline"
// };

// export default function AppointmentDetailsPage() {
//   return <AppointmentDetails appointment={exampleAppointment} />;
// }
