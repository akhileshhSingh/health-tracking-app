const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/HealthRecord');

// POST /health-records: Create a new health record
router.post('/', async (req, res) => {
    try {
        const healthRecord = new HealthRecord({
            date: req.body.date,
            bodyTemperature: req.body.bodyTemperature,
            bloodPressure: req.body.bloodPressure,
            heartRate: req.body.heartRate
        });
        const savedRecord = await healthRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /health-records: Retrieve all health records
router.get('/', async (req, res) => {
    try {
        const healthRecords = await HealthRecord.find();
        res.json(healthRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /health-records/:id: Retrieve a specific health record by ID
router.get('/:id', async (req, res) => {
    try {
        const healthRecord = await HealthRecord.findById(req.params.id);
        if (!healthRecord) return res.status(404).json({ message: 'Record not found' });
        res.json(healthRecord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /health-records/:id: Update a health record
router.put('/:id', async (req, res) => {
    try {
        const healthRecord = await HealthRecord.findById(req.params.id);
        if (!healthRecord) return res.status(404).json({ message: 'Record not found' });

        healthRecord.date = req.body.date || healthRecord.date;
        healthRecord.bodyTemperature = req.body.bodyTemperature || healthRecord.bodyTemperature;
        healthRecord.bloodPressure = req.body.bloodPressure || healthRecord.bloodPressure;
        healthRecord.heartRate = req.body.heartRate || healthRecord.heartRate;

        const updatedRecord = await healthRecord.save();
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /health-records/:id: Delete a health record
router.delete('/:id', async (req, res) => {
    try {
        // const healthRecord = await HealthRecord.findById(req.params.id);
        const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);
        // if (!healthRecord) return res.status(404).json({ message: 'Record not found' });
        if (!healthRecord) {
            return res.status(404).json({ message: 'Health record not found' });
        }

        // await healthRecord.remove();
        res.json({ message: 'Health Record deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
