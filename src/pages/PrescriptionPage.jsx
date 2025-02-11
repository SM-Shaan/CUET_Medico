import React from 'react';
import AddPrescription from '../components/prescriptions/AddPrescription';
import Prescriptions from '../components/prescriptions/Prescriptions';
const PrescriptionPage = ({ appointmentId }) => {
    return (
        <div>
            <h1>Prescriptions</h1>
            {/* <AddPrescription appointmentId={appointmentId} /> */}
            <Prescriptions appointmentId={appointmentId} />
        </div>
    );
};
export default PrescriptionPage;
