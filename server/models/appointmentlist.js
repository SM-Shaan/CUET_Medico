const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    prescription: { type: String, default: '' },
    medicalReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedicalReport" }]
}, { timestamps: true });
module.exports = mongoose.model("Appointment", appointmentSchema);