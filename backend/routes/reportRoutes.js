const express = require('express');
const multer = require('multer');

const Report = require('../models/Report.js');
const { protect } = require('../middleware/authMiddleware.js');
const { logActivity } = require('../middleware/Utils/logActivity.js');

const router = express.Router();

// Multer setup for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST - Submit Report
router.post(
    '/',
    protect,
    upload.single('image'),
    async (req, res) => {
        try {
            const { title, description, lat, lng } = req.body;
            const image = req.file ? req.file.buffer.toString('base64') : null;
            console.log('request body:', req.body);
            console.log('User info:', req.user);

            const report = new Report({
                title,
                description,
                imageUrl: image,
                location: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                },
                createdBy: req.user.id,
                role: req.user.role,
            });

            await report.save();
            console.log('Report saved:', savedReport);

            // Emit new report alert via socket.io
            const io = req.app.get('io');
            io.emit('new_report_alert', {
                title: report.title,
                createdBy: req.user.role,
                time: new Date(),
            });

            // Log activity
            await logActivity(req.user, 'Report Submitted', `Title: ${report.title}`);

            res.status(201).json(report);
        } catch (err) {
            console.error('🚨 Report Submission Error:', err);
            res.status(500).json({ message: 'Failed to submit report', error: err.message });
        }
    }
);

// GET - All Reports (CEO only)
router.get('/all', protect, async (req, res) => {
    if (req.user.role !== 'ceo') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const reports = await Report.find().populate('createdBy', 'name role');
    res.json(reports);
});

// GET - Own Reports (Pilot)
router.get('/mine', protect, async (req, res) => {
    const reports = await Report.find({ createdBy: req.user.id });
    res.json(reports);
});

module.exports = router;
