// server/controllers/employerController.js
const Job = require('../models/Job');
const User = require('../models/User');

exports.postJob = async (req, res) => {
    const { title, description, skills, remote, flexibleSchedule } = req.body;
    try {
        const newJob = new Job({
            title,
            description,
            skills: skills.split(','),
            employer: req.user.id,
            remote,
            flexibleSchedule,
        });
        const job = await newJob.save();
        res.status(201).json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.searchCandidates = async (req, res) => {
    const { skills } = req.query;
    try {
        const candidates = await User.find({
            role: 'jobseeker',
            'profile.skills': { $in: skills.split(',') },
        });
        res.json(candidates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
