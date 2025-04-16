const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
require('./DBConn/conn'); // Ensure this connects to MongoDB
const cors = require('cors');

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser()); // To handle JWT in cookies

// Import Routes
const GymRoutes = require('./Routes/gym');
const dietNutritionPlanRoutes = require('./Routes/DietNutritionPlans');
const earningRoutes = require('./Routes/EarningPayments');
const equipmentRoutes = require('./Routes/EquipmentStatus');
const gymAttendanceRoutes = require('./Routes/GymAttendance');
const feedbackRoutes = require('./Routes/MemberFeedback');
const memberRoutes = require('./Routes/Members');
const planRoutes = require('./Routes/MembershipPlans');
const registrationRoutes = require('./Routes/NewRegistration');
const trainerRoutes = require('./Routes/Trainers');
const workoutRoutes = require('./Routes/WorkoutSchedule');

// Use Routes
app.use('/auth', GymRoutes);
app.use('/api/diet-nutrition-plans', dietNutritionPlanRoutes);
app.use('/api/earnings', earningRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/attendance', gymAttendanceRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/workouts', workoutRoutes);

// 404 Handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API route not found!',
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Something went wrong!',
    });
});

// Server Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on Port ${PORT}`);
});
