const express = require('express');
const { getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController.js');
const { register, login } = require('../controllers/userController.js')
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', authMiddleware, getAssignments);
router.post('/assignments/:id/accept', authMiddleware, acceptAssignment);
router.post('/assignments/:id/reject', authMiddleware, rejectAssignment);

module.exports = router;    