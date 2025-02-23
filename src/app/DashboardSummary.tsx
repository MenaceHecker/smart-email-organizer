// DashboardSummary.tsx
"use client";
import React from 'react';

const DashboardSummary = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard Summary Section</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Total Emails</h3>
          <p className="text-3xl font-bold text-blue-600">150</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Urgent Emails</h3>
          <p className="text-3xl font-bold text-red-600">5</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Categories</h3>
          <p>Work: 80</p>
          <p>Personal: 40</p>
          <p>Promo: 30</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;