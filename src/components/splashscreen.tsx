"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // ✅ For smooth animations

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDoneLoading(true), 800); // ⏳ Keep screen for 0.8s after 100%
          return 100;
        }
        return prev + 3; // ✅ Smooth progress increase
      });
    }, 80); // ✅ Faster & smoother update interval

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (doneLoading) {
      setTimeout(() => {
        onFinish();
      }, 1000); // ⏳ Keep screen visible for 1s after reaching 100%
    }
  }, [doneLoading, onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center text-white bg-black z-50 overflow-hidden">
      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 animate-pulse"></div>

      {/* 🔥 Animated Logo */}
      <motion.h1 
        className="text-5xl font-bold mb-6 relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <span className="text-white">inbox</span>
        <span className="text-red-500">IQ</span>
      </motion.h1>

      {/* 🔥 Animated Progress Bar */}
      <div className="w-3/4 md:w-1/3 h-4 bg-gray-700 rounded-full overflow-hidden mt-4 relative z-10">
        <motion.div
          className="h-full bg-red-500"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.2 }} // ✅ Smooth loading bar
        ></motion.div>
      </div>

      {/* 🔥 Pulsing Loading Text */}
      <motion.p 
        className="mt-4 text-gray-400 relative z-10"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Prioritizing Your Important Emails...
      </motion.p>
    </div>
  );
}
