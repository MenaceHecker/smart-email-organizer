"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, FormEvent } from "react";
import Link from "next/link";

const SignInPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("SignInPage Loaded");
    if (typeof window !== "undefined") {
      console.log("Current URL:", window.location.href);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-transparent bg-opacity-80">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-50 rounded-lg shadow-lg mx-auto">
        <h1 className="text-2xl font-bold mb-5 text-center">Sign In</h1>

        {session ? (
          <div className="flex flex-col items-center">
            <p>Welcome, {session.user?.name}!</p>
            <img
              src={session.user?.image || (session.user?.email?.includes("@outlook") ? "/default-avatar.png" : undefined)}
              alt="User Avatar"
              className="h-12 w-12 rounded-full mt-2"
            />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-5">
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded text-lg cursor-pointer mb-5 hover:bg-blue-600"
              >
                Sign in
              </button>
            </form>

            {/* Sign-Up Option */}
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>

            <div className="flex items-center my-5">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-600 text-sm">Or sign in with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex gap-2 mt-2">
  {/* Google Sign-In Button */}
  <button
    type="button"
    className="flex-1 p-2 bg-white text-gray-700 border border-gray-300 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
    onClick={() => signIn("google")} // Google Sign-In
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 186.69 190.5"
    >
      <g transform="translate(1184.583 765.171)">
        <path
          d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
          fill="#4285f4"
        />
        <path
          d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
          fill="#34a853"
        />
        <path
          d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
          fill="#fbbc05"
        />
        <path
          d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
          fill="#ea4335"
        />
      </g>
    </svg>
    <span>Google</span>
  </button>

  {/* Outlook Sign-In Button */}
  <button
    type="button"
    className="flex-1 p-2 bg-blue-600 text-white rounded text-sm flex items-center justify-center gap-2 hover:bg-blue-700"
    onClick={() => signIn("azure-ad")} // Outlook Sign-In
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      width="20"
      height="20"
    >
      <path d="M2 5v14h20V5H2zm18 12H4V7h16v10zm-4.7-8.5c.6 0 1.2.2 1.7.6s.8 1 .8 1.6-.2 1.2-.6 1.7c-.4.5-1 .8-1.7.8-.6 0-1.2-.2-1.7-.6s-.8-1-.8-1.7c0-.6.2-1.2.6-1.7s1-.7 1.7-.7zM9 10v4H7v-4H6V9h3v1h-1zm7 1.5c-.2 0-.3.1-.5.2s-.2.2-.3.4-.1.3-.1.5.1.4.2.5.3.2.5.2.3-.1.5-.2.2-.3.3-.5.1-.3.1-.5-.1-.3-.2-.5-.3-.2-.5-.2z" />
    </svg>
    <span>Outlook</span>
  </button>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
