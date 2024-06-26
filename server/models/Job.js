const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: String,
    remote: Boolean,
    flexibleSchedule: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);