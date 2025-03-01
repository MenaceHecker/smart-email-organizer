"use client";

import React, { useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

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

  const handleGoogleSignIn = () => {
    console.log("Google sign-in initiated");
  };

  const handleOutlookSignIn = () => {
    console.log("Outlook sign-in initiated");
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-white bg-opacity-80">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mx-auto">
        <h1 className="text-2xl font-bold mb-5 text-center">Sign In</h1>

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

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded text-lg cursor-pointer mb-5 hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-600 text-sm">Or sign in with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex-1 p-2 bg-white text-gray-700 border border-gray-300 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 186.69 190.5">
              <g transform="translate(1184.583 765.171)">
                <path d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"/>
                <path d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/>
                <path d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/>
                <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335"/>
              </g>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handleOutlookSignIn}
            className="flex-1 p-2 bg-blue-600 text-white rounded text-sm flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zm4.93 1.75q0-.21-.06-.4-.06-.19-.19-.35-.13-.17-.31-.29-.18-.12-.43-.12-.23 0-.4.11-.18.11-.31.28-.13.17-.2.35-.07.18-.07.39 0 .21.06.4.07.19.2.35.13.17.31.28.18.11.41.11.22 0 .39-.11.18-.1.31-.27.13-.17.19-.35.06-.18.06-.39z" />
            </svg>
            <span>Outlook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
