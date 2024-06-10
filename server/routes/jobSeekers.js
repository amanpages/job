// server/routes/jobSeekers.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { searchJobs, applyJob } = require('../controllers/jobSeekerController');

router.get('/jobs', auth, auth.checkRole(['jobseeker']), searchJobs);
router.post('/apply', auth, auth.checkRole(['jobseeker']), applyJob);

module.exports = router;
