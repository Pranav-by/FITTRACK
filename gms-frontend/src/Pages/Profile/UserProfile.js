import React from 'react';

const UserProfile = () => {
  const userData = {
    username: "fituser123",
    email: "user@example.com",
    gymName: "Iron Temple",
    joined: "March 2024",
  };

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="max-w-xl mx-auto bg-black/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-3xl font-bold mb-4 border-b border-white/20 pb-2">User Profile</h2>

        <div className="mb-4">
          <label className="text-gray-400">Username:</label>
          <div className="text-lg font-semibold">{userData.username}</div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400">Email:</label>
          <div className="text-lg font-semibold">{userData.email}</div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400">Gym Name:</label>
          <div className="text-lg font-semibold">{userData.gymName}</div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400">Joined:</label>
          <div className="text-lg font-semibold">{userData.joined}</div>
        </div>

        <button className="mt-4 bg-purple-600 hover:bg-purple-700 transition-all duration-300 px-6 py-2 rounded-lg text-white font-semibold">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
