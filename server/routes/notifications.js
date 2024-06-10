const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// GET notifications
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id, isRead: false }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err.message);
        res.status(500).send('Server error');
    }
});

// PUT mark notification as read
router.put('/:id', auth, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        notification.isRead = true;
        await notification.save();

        res.json(notification);
    } catch (err) {
        console.error('Error updating notification:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
