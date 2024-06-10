// server/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, getJobs } = require('../controllers/adminController');

router.get('/users', auth, auth.checkRole(['admin']), getUsers);
router.get('/jobs', auth, auth.checkRole(['admin']), getJobs);

module.exports = router;
