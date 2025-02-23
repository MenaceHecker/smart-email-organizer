// page.tsx
"use client";
import React from 'react';
import TypingText from './TypingText';
import DashboardSummary from './DashboardSummary';

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col">
      <main className="flex flex-col items-center justify-center text-white p-4 pb-48">
        <h1 className="text-4xl font-bold">
          Welcome to <TypingText texts={['Email Organizer', 'Productivity Booster', 'Your Inbox Solution']} />
        </h1>
        <p className="text-lg mt-4">Manage your emails efficiently!</p>
        <p className="mt-2">Start organizing your emails today.</p>
      </main>
      <DashboardSummary />
    </div>
  );
}