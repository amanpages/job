// server/controllers/adminController.js
const User = require('../models/User');
const Job = require('../models/Job');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
