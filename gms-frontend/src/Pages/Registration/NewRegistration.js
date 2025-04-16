import React, { useState } from 'react';
import axios from 'axios';

const NewRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic',
    startDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate all fields (simple check)
      if (!formData.name || !formData.email || !formData.phone || !formData.plan || !formData.startDate) {
        alert('⚠️ Please fill out all fields.');
        return;
      }

      // 1. Register the user first
      const registrationRes = await axios.post(
        'http://localhost:4000/api/registrations',
        formData,
        { withCredentials: true }
      );

      // 2. Create a member based on registration
      const memberPayload = {
        name: formData.name,
        email: formData.email,
        membership: formData.plan,
        dateOfStart: formData.startDate,
      };

      const memberRes = await axios.post(
        'http://localhost:4000/api/members',
        memberPayload,
        { withCredentials: true }
      );

      // ✅ Success
      alert('🎉 Member registered and added successfully!');
      setFormData({ name: '', email: '', phone: '', plan: 'Basic', startDate: '' });

    } catch (error) {
      // Better error message
      console.error('❌ Error:', error);

      if (error.response && error.response.data && error.response.data.error) {
        alert(`❌ ${error.response.data.error}`);
      } else {
        alert('❌ Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        📝 New Member Registration
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6 backdrop-blur-md"
      >
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Membership Plan</label>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-105"
        >
          🚀 Register Member
        </button>
      </form>
    </div>
  );
};

export default NewRegistration;
