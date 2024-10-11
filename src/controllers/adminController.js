const Assignment = require('../models/assignment');

// Get All Assignments for an Admin
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id }).populate('userId', 'name').exec();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching assignments' });
    }
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
        assignment.status = 'accepted';
        await assignment.save();
        res.status(200).json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(500).json({ error: 'Error accepting assignment' });
    }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
        assignment.status = 'rejected';
        await assignment.save();
        res.status(200).json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting assignment' });
    }
};