const express = require('express');
const { register, login, uploadAssignment,fetchAdmins } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authMiddleware, uploadAssignment);
router.get('/admins', authMiddleware, fetchAdmins);

module.exports = router;