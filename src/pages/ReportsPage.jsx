// filepath: /c:/Users/Shaan/Downloads/Telegram Desktop/CUET_Medico/CUET_Medico/src/pages/ReportsPage.jsx
import React from 'react';
import UploadMedicalReport from '../components/reports/UploadMedicalReport';
import MedicalReports from '../components/reports/MedicalReports';

const ReportsPage = ({ patientId }) => {
    return (
        <div>
            <h1>Medical Reports</h1>
            <UploadMedicalReport patientId={patientId} />
            {/* <MedicalReports patientId={patientId} /> */}
        </div>
    );
};

export default ReportsPage;