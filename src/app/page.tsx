import React from 'react';
export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden" style={{ height: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/BgVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Email Organizer</h1>
        <p className="text-lg mt-4">Manage your emails efficiently!</p>
        <p className="mt-2">Start organizing your emails today.</p>
      </main>
    </div>
  );
}
