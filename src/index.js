
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routers/userRoutes');
const adminRoutes = require('./routers/adminRoutes');

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admins', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
