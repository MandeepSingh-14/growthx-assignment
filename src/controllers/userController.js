const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Assignment = require("../models/assignment.js");
const { validateRegister, validateLogin } = require("../utils/validation");

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (
      [name, email,password, role].some(
        (field) => field?.trim() === ""
      ) // check ki field ko trim kr dijiye bt age uske baad bhi vo true bheja to khali tha
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already registered",
        success: false,
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
  try {
    const { task, adminId } = req.body;
    const assignment = new Assignment({
      userId: req.user.id,
      task,
      adminId,
    });
    await assignment.save();
    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading assignment" });
  }
};


exports.fetchAdmins = async (req, res) => {
    try {
      const admins = await User.find({ role: 'admin' }).select('name email');
      if (!admins.length) {
        return res.status(404).json({ message: "No admins found" });
      }
  
      return res.status(200).json({
        message: "Admins fetched successfully",
        data: admins,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch admins", error: error.message });
    }
  };   