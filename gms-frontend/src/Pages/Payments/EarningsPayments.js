import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

const EarningsPayments = () => {
  const [earnings, setEarnings] = useState([]); // Start with an empty array
  const [showForm, setShowForm] = useState(false);
  const [newEarning, setNewEarning] = useState({ date: '', source: '', amount: '' });

  const total = earnings.reduce((sum, e) => sum + e.amount, 0);

  useEffect(() => {
    // Fetch earnings from backend when the component mounts
    axios.get('http://localhost:4000/api/earnings', { withCredentials: true })
      .then(res => {
        setEarnings(res.data); // Set the earnings from the response
      })
      .catch(err => console.error('Error fetching earnings:', err));
  }, []);

  const addEarning = () => {
    if (newEarning.date && newEarning.source && newEarning.amount) {
      const updatedEarning = { ...newEarning, amount: parseFloat(newEarning.amount) };
      
      console.log('Adding new earning:', updatedEarning);  // Log to see the data being sent to the backend

      // Post new earning to the backend
      axios.post('http://localhost:4000/api/earnings', updatedEarning, { withCredentials: true })
        .then(res => {
          console.log('New earning added:', res.data);  // Log the response data from the backend

          // Re-fetch earnings after adding new one
          axios.get('http://localhost:4000/api/earnings', { withCredentials: true })
            .then(res => {
              setEarnings(res.data);
              setNewEarning({ date: '', source: '', amount: '' });
              setShowForm(false);
            })
            .catch(err => console.error('Error fetching updated earnings:', err));
        })
        .catch(err => {
          console.error('Error adding earning:', err);
          alert('Error adding earning');
        });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDelete = (id) => {
    // Delete earning from the backend
    axios.delete(`http://localhost:4000/api/earnings/${id}`, { withCredentials: true })
      .then(() => {
        // Remove deleted earning from the state
        setEarnings(earnings.filter(e => e._id !== id));
      })
      .catch(err => console.error('Error deleting earning:', err));
  };

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">💰 Earnings & Payments</h1>

      {/* Add Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-xl transition"
        >
          <Plus /> Add Earning
        </button>
      </div>

      {/* Modal for Adding Earning */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl space-y-4 w-full max-w-md">
            <h2 className="text-2xl text-white font-bold">➕ Add Earning</h2>
            <input
              type="date"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newEarning.date}
              onChange={(e) => setNewEarning({ ...newEarning, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Source (e.g. Membership)"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newEarning.source}
              onChange={(e) => setNewEarning({ ...newEarning, source: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newEarning.amount}
              onChange={(e) => setNewEarning({ ...newEarning, amount: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="text-red-400">Cancel</button>
              <button onClick={addEarning} className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Total Summary */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Total Earnings:</h2>
        <p className="text-green-400 text-2xl font-bold">₹{total}</p>
      </div>

      {/* Earnings Table */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="text-green-300 border-b border-gray-600">
              <th className="py-2">Date</th>
              <th className="py-2">Source</th>
              <th className="py-2">Amount (₹)</th>
              <th className="py-2">Action</th> {/* New column for delete */}
            </tr>
          </thead>
          <tbody>
            {earnings.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-700 transition-all">
                <td className="py-2">{entry.date}</td>
                <td className="py-2">{entry.source}</td>
                <td className="py-2 text-green-300 font-semibold">₹{entry.amount}</td>
                <td className="py-2">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Earning"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsPayments;
