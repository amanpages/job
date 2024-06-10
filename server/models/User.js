// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['jobseeker', 'employer', 'admin'], required: true },
    profile: {
        type: Map,
        of: String,
    },
    skills: [String],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
