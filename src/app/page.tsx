"use client";
import React from "react";
import TypingText from "./TypingText";
import DashboardSummary from "./DashboardSummary";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="relative flex flex-col">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/BgVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Welcome Section with animations */}
        <main className="flex flex-col items-center justify-center text-white p-4 h-screen transition-all duration-700 ease-in-out animate-fade-in">
          <h1 className="text-4xl font-bold text-center opacity-0 animate-fade-in-up animation-delay-100">
            Welcome to{" "}
            <TypingText texts={["Email Organizer", "Productivity Booster", "Your Inbox Solution"]} />
          </h1>
          <p className="text-lg mt-4 opacity-0 animate-fade-in-up animation-delay-300">
            Manage your emails efficiently!
          </p>
          <p className="mt-2 opacity-0 animate-fade-in-up animation-delay-500">
            Start organizing your emails today.
          </p>

          {!session && (
            <Link href="/signin">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition opacity-0 animate-fade-in-up animation-delay-700">
                Get Started
              </button>
            </Link>
          )}
        </main>

        {/* Dashboard Summary */}
        <section className="relative w-full bg-transparent text-black p-8">
          <DashboardSummary />
        </section>
      </div>
    </div>
  );
}
