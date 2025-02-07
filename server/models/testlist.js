const mongoose = require('mongoose');

const testsSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    fee: { type: Number, required: true }
});

const TestModel = mongoose.model("Test", testsSchema);
module.exports = TestModel;
