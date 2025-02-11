// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middleware/fileUpload');
const auth = require('../middleware/auth');
const Appointment = require('../models/appointmentlist');
const MedicalReport = require('../models/medicalreport');
// const Appointment = require('../models/appointmentModel');
// const MedicalReport = require('../models/medicalReportModel');

// Upload Medical Report
// router.post('/uploadMedicalReport', async (req, res) => {
//     const { patientId, reportName, reportFile, uploadedBy } = req.body;

//     try {
//         const newReport = new MedicalReport({ patientId, reportName, reportFile, uploadedBy });
//         await newReport.save();
//         res.status(201).json({ message: "Medical report uploaded successfully", report: newReport });
//     } catch (error) {
//         res.status(500).json({ message: "Error uploading medical report", error });
//     }
// });

// // Add Prescription
// router.post('/addPrescription', async (req, res) => {
//     const { appointmentId, prescription } = req.body;

//     try {
//         const appointment = await Appointment.findById(appointmentId);
//         if (!appointment) {
//             return res.status(404).json({ message: "Appointment not found" });
//         }

//         appointment.prescription = prescription;
//         await appointment.save();

//         res.status(200).json({ message: "Prescription added successfully", appointment });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding prescription", error });
//     }
// });

// // Get Medical Reports by Patient ID
// router.get('/medicalReports/:patientId', async (req, res) => {
//     const { patientId } = req.params;

//     try {
//         const reports = await MedicalReport.find({ patientId });
//         res.status(200).json(reports);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching medical reports', error });
//     }
// });

// // Get Appointment by ID
// router.get('/appointments/:appointmentId', async (req, res) => {
//     const { appointmentId } = req.params;

//     try {
//         const appointment = await Appointment.findById(appointmentId);
//         if (!appointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }
//         res.status(200).json(appointment);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching appointment', error });
//     }
// });

// module.exports = router;

// Upload Medical Report (Patient)
router.post('/reports', 
    auth.checkJwt,
    auth.authorizeRoles(['patient']),
    upload.single('file'),
    async (req, res) => {
      try {
        const { appointmentId, title } = req.body;
        const result = await uploadToCloudinary(req.file.buffer);
        
        const report = new MedicalReport({
          patientId: req.auth.sub, // Use Auth0 ID
          appointmentId,
          title,
          fileUrl: result.secure_url,
          uploadedBy: req.auth.sub
        });  
        await report.save();
        await Appointment.findByIdAndUpdate(appointmentId, {
            $push: { medicalReports: report._id }
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add Prescription (Doctor)
router.post('/appointments/:id/prescription', auth.authorizeRoles(['doctor']), async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            doctorId: req.user.id
        });

        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        appointment.prescription = req.body.prescription;
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/appointments/:id', auth.authorizeRoles(['patient', 'doctor', 'admin']), async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('doctorId', 'name specialization')
            .populate('medicalReports', 'title fileUrl createdAt');
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        // Authorization check
        if (req.user.role !== 'admin' && 
            !appointment.patientId.equals(req.user.id) && 
            !appointment.doctorId.equals(req.user.id)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;