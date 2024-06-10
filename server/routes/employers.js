const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { postJob, searchCandidates } = require('../controllers/employerController');

router.post('/jobs', auth, auth.checkRole(['employer']), postJob);
router.get('/candidates', auth, auth.checkRole(['employer']), searchCandidates);

module.exports = router;
