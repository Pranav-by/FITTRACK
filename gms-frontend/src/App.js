// src/App.js
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Pages/Home/Dashboard/Dashboard';
import Home from './Pages/Home/home';
import Member from './Pages/Home/Members/member';
import MembershipPlans from './Pages/Plans/MembershipPlans';
import Trainers from './Pages/Trainers/Trainers';
import GymAttendance from './Pages/Attendance/GymAttendance';
import EarningsPayments from './Pages/Payments/EarningsPayments';
import WorkoutSchedule from './Pages/Workout/WorkoutSchedule';
import EquipmentStatus from './Pages/Equipment/EquipmentStatus';
import DietNutritionPlans from './Pages/DietNutrition/DietNutritionPlans';
import MemberFeedback from './Pages/Feedback/MemberFeedback';
import Members from './Pages/Members/Members';
import NewRegistration from './Pages/Registration/NewRegistration';
import UserProfile from './Pages/Profile/UserProfile';
import ForgetPassword from './Components/ForgetPassword/forgetPassword';
import ProtectedRoute from './utils/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    setIsLogin(isLoggedIn === "true");
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden bg-black">
      {/* Sidebar for authenticated users */}
      {isLogin && <Sidebar />}

      <div className="flex-1 overflow-auto">
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home setIsLogin={setIsLogin} />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/member" element={<ProtectedRoute><Member /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><MembershipPlans /></ProtectedRoute>} />
          <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><GymAttendance /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><EarningsPayments /></ProtectedRoute>} />
          <Route path="/schedules" element={<ProtectedRoute><WorkoutSchedule /></ProtectedRoute>} />
          <Route path="/equipment" element={<ProtectedRoute><EquipmentStatus /></ProtectedRoute>} />
          <Route path="/nutrition" element={<ProtectedRoute><DietNutritionPlans /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><MemberFeedback /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
          <Route path="/registrations" element={<ProtectedRoute><NewRegistration /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* 404 Fallback */}
          <Route path="*" element={<div className="p-4 text-white">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
