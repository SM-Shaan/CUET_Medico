// import React, { useState } from 'react';
// import axios from 'axios';
// const UploadMedicalReport = ({ patientId }) => {
//     const [reportName, setReportName] = useState('');
//     const [reportFile, setReportFile] = useState(null);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('reportName', reportName);
//         formData.append('reportFile', reportFile);
//         formData.append('patientId', patientId);
//         formData.append('uploadedBy', 'patient'); // Replace with actual user ID
//         try {
//             const response = await axios.post('http://localhost:5000/api/uploadMedicalReport', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             alert(response.data.message);
//         } catch (error) {
//             alert('Error uploading medical report');
//         }
//     };
//     return (
//         <div>
//             <h2>Upload Medical Report</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Report Name" value={reportName} onChange={(e) => setReportName(e.target.value)} required />
//                 <input type="file" onChange={(e) => setReportFile(e.target.files[0])} required />
//                 <button type="submit">Upload</button>
//             </form>
//         </div>
//     );
// };
// export default UploadMedicalReport;

// filepath: /c:/Users/Shaan/Downloads/Telegram Desktop/CUET_Medico/CUET_Medico/src/components/reports/UploadMedicalReport.jsx
import React, { useState } from 'react';
// import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const UploadMedicalReport = ({ appointment }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('appointmentId', appointment._id);

        try {
            const token = await getAccessTokenSilently();
            await axios.post('http://localhost:5000/api/reports', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Report uploaded successfully');
        } catch (error) {
            alert('Error uploading report');
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Upload Medical Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Report Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadMedicalReport;