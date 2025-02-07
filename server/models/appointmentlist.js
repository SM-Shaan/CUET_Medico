const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, trim: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctorModel", required: true }, 
    appointmentDay: { type: Date, required: true }, 
    selectedTime: {type: Number, required: true},
    // status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" } // Optional
});

const appointmentModel = mongoose.model("Appointment", appointmentSchema);
module.exports = appointmentModel;
