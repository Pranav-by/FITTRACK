import React, { useState } from 'react';

const MemberFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Aman Gupta',
      date: '2025-04-01',
      type: 'Feedback',
      message: 'Great gym facilities! The new machines are amazing.',
      status: 'Solved',  // New field for status
      reply: '',  // New field for reply
    },
    {
      id: 2,
      name: 'Meera Singh',
      date: '2025-04-02',
      type: 'Query',
      message: 'What are the timings for Zumba classes?',
      status: 'Pending',
      reply: '',
    },
    {
      id: 3,
      name: 'Ravi Kumar',
      date: '2025-04-03',
      type: 'Feedback',
      message: 'Trainers are really helpful. Loved the workout guidance!',
      status: 'Solved',
      reply: '',
    },
    {
      id: 4,
      name: 'Simran Kaur',
      date: '2025-04-03',
      type: 'Query',
      message: 'Can I freeze my membership for a month?',
      status: 'Pending',
      reply: '',
    },
  ]);

  // Function to handle editing the status
  const handleEditStatus = (id) => {
    const newStatus = prompt('Enter new status (Solved/Pending):');
    if (newStatus === 'Solved' || newStatus === 'Pending') {
      const updatedFeedbacks = feedbacks.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setFeedbacks(updatedFeedbacks);
    } else {
      alert('Invalid status. Please enter "Solved" or "Pending".');
    }
  };

  return (
    <div className="p-10 min-h-screen text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">💬 Member Feedback & Queries</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className={`bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 ${
              item.type === 'Feedback' ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
            }`}
          >
            <h2 className="text-lg font-semibold mb-1">
              {item.name} <span className="text-sm text-gray-400">({item.date})</span>
            </h2>
            <p className="text-sm text-pink-400 mb-2">Type: {item.type}</p>
            <p className="text-gray-300">📝 {item.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              Status: <span className={`text-${item.status === 'Solved' ? 'green' : 'yellow'}-400`}>{item.status}</span>
            </p>

            {/* Edit Status Button */}
            <button
              onClick={() => handleEditStatus(item.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Edit Status
            </button>

            {/* If it's a query, show the reply button */}
            {item.type === 'Query' && item.status === 'Pending' && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    const replyMessage = prompt('Enter your reply:');
                    if (replyMessage) {
                      const updatedFeedbacks = feedbacks.map((feedback) =>
                        feedback.id === item.id ? { ...feedback, reply: replyMessage, status: 'Solved' } : feedback
                      );
                      setFeedbacks(updatedFeedbacks);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Reply
                </button>
              </div>
            )}

            {/* If there is a reply, display it */}
            {item.reply && (
              <div className="mt-4 text-gray-300">
                <strong>Reply:</strong> {item.reply}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberFeedback;
