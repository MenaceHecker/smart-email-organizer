"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Account created successfully! Please sign in.");
      router.push("/signin"); // Redirect to sign-in page
    } else {
      alert("Sign-up failed. Try again.");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-transparent bg-opacity-80">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-50 rounded-lg shadow-lg mx-auto">
        <h1 className="text-2xl font-bold mb-5 text-center">Sign Up</h1>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded text-lg cursor-pointer mb-5 hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
