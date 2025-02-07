const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    availability: [{ day: String, timeSlot: String }]  
});

const doctorModel = mongoose.model("Doctor", doctorsSchema);
module.exports = doctorModel;


