const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    bodyTemperature: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    heartRate: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Automatically update `updatedAt` before save
healthRecordSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
