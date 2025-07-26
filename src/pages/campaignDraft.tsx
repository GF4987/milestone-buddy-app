import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CampaignDraft() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Navigate to milestone management with campaign data
    navigate('/milestone-management', {
      state: {
        title,
        description,
        goalAmount,
        daysLeft,
        currentAmount
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create a Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="block text-sm font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full px-4 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="description"
          className="block text-sm font-semibold mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          className="w-full px-4 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="goalAmount"
          className="block text-sm font-semibold mb-1"
        >
          Goal Amount
        </label>
        <input
          type="number"
          id="goalAmount"
          value={goalAmount}
          onChange={(event) => setGoalAmount(Number(event.target.value))}
          className="w-full px-4 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label htmlFor="daysLeft" className="block text-sm font-semibold mb-1">
          Days Left
        </label>
        <input
          type="number"
          id="daysLeft"
          value={daysLeft}
          onChange={(event) => setDaysLeft(Number(event.target.value))}
          className="w-full px-4 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="currentAmount"
          className="block text-sm font-semibold mb-1"
        >
          Current Amount
        </label>
        <input
          type="number"
          id="currentAmount"
          value={currentAmount}
          onChange={(event) => setCurrentAmount(Number(event.target.value))}
          className="w-full px-4 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CampaignDraft;
