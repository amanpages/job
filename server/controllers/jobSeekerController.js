// server/controllers/jobSeekerController.js
const Job = require('../models/Job');
const Application = require('../models/Application');
const Notification = require('../models/Notification');
const User = require('../models/User');
const transporter = require('../config/nodemailer');

exports.searchJobs = async (req, res) => {
    const { remote, flexibleSchedule } = req.query;
    try {
        const jobs = await Job.find({
            remote: remote === 'true',
            flexibleSchedule: flexibleSchedule === 'true',
        });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.applyJob = async (req, res) => {
    const { jobId } = req.body;
    const applicantId = req.user.id;

    try {
        const job = await Job.findById(jobId).populate('employer');
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
        if (existingApplication) {
            return res.status(400).json({ msg: 'You have already applied for this job' });
        }

        const newApplication = new Application({
            job: jobId,
            applicant: applicantId,
        });

        await newApplication.save();

        // Create notification for the employer
        const notification = new Notification({
            user: job.employer._id,
            message: `You have a new application for the job "${job.title}" from ${applicantId}.`,
        });
        await notification.save();

        const employer = job.employer;
        const applicant = await User.findById(applicantId);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: employer.email,
            subject: 'New Job Application',
            text: `You have a new application for the job "${job.title}" from ${applicant.username}.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error(error);
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(201).json({ msg: 'Job application successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
