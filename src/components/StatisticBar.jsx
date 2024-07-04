import React from 'react';

const StatisticBar = ({ totalRequests }) => {
  const percentage = (totalRequests / 1000) * 100; // Assuming 1000 is the maximum

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Total API Requests</h2>
      <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="mt-2 text-right">{totalRequests} / 1000</p>
    </div>
  );
};

export default StatisticBar;