const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' }
});
module.exports = mongoose.model("User", userSchema);