import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react'; // Trash2 icon added

const MembershipPlans = () => {
  const [plans, setPlans] = useState([
    { name: 'Basic Plan', duration: '1 Month', price: 999, features: ['Gym Access'] },
    { name: 'Standard Plan', duration: '3 Months', price: 2499, features: ['Gym Access', '1 Free Personal Training Session'] },
    { name: 'Gold Plan', duration: '6 Months', price: 4499, features: ['Gym + Cardio', 'Diet Plan', 'Free PT Session Monthly'] },
    { name: 'Platinum Plan', duration: '1 Year', price: 7999, features: ['All Access', 'Monthly Progress Check', 'Diet Consultation'] },
  ]);

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', duration: '', price: '', features: '' });

  const filteredPlans = plans
    .filter(plan =>
      plan.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? plan.duration === filter : true)
    )
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const handleAdd = () => {
    const featuresArray = newPlan.features.split(',').map(f => f.trim());
    setPlans(prev => [...prev, { ...newPlan, price: Number(newPlan.price), features: featuresArray }]);
    setNewPlan({ name: '', duration: '', price: '', features: '' });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure you want to delete this plan?");
    if (confirm) {
      setPlans(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-10 min-h-screen text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">📋 Membership Plans</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-xl font-bold transition hover:scale-105"
        >
          <Plus size={20} /> Add Plan
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search plans..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none"
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600"
        >
          <option value="">All Durations</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="1 Year">1 Year</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Sort ₹ {sortOrder === 'asc' ? '⬆️' : '⬇️'}
        </button>
      </div>

      {/* Plans Display */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.map((plan, index) => (
          <div key={index} className="relative bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-bold text-green-400 mb-2">{plan.name}</h2>
            <p className="text-gray-300 mb-1">🕒 {plan.duration}</p>
            <p className="text-yellow-400 font-semibold text-lg mb-4">💰 ₹{plan.price}</p>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              {plan.features.map((feature, i) => <li key={i}>✔ {feature}</li>)}
            </ul>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition duration-200"
              title="Delete Plan"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Plan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-white">➕ Add New Plan</h2>
            <input
              type="text"
              placeholder="Plan Name"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Duration"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newPlan.duration}
              onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price ₹"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Features (comma separated)"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newPlan.features}
              onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="text-red-400">Cancel</button>
              <button onClick={handleAdd} className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">Add Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPlans;
