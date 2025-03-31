"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Email {
  id: string;
  sender: string;
  subject: string;
  timestamp?: string; // Optional timestamp for better UI
}

export default function DashboardSummary() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUnread, setTotalUnread] = useState(0); // Unread emails count

  useEffect(() => {
    async function fetchEmails() {
      setLoading(true);
      try {
        const res = await fetch("/api/emails");
        const data = await res.json();

        if (Array.isArray(data)) {
          setEmails(data);
          setTotalUnread(data.length); // Example: Count total emails (adjust for unread only)
        } else {
          console.error("Unexpected API response:", data);
          setEmails([]);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        setEmails([]);
      }
      setLoading(false);
    }

    fetchEmails();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {/* Summary Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">📩 Inbox Summary</h2>
        <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
          {totalUnread} Unread
        </span>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-gray-500 text-center py-4">Loading emails...</p>
      ) : emails.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No new emails.</p>
      ) : (
        <ul className="mt-4">
          {emails.slice(0, 5).map((email) => (
            <li
              key={email.id}
              className="p-4 border-b hover:bg-gray-100 transition flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar Icon */}
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                  {email.sender.charAt(0).toUpperCase()}
                </div>

                {/* Email Details */}
                <div>
                  <strong className="text-blue-600 block">{email.sender}</strong>
                  <span className="text-gray-600">{email.subject}</span>
                </div>
              </div>

              {/* Timestamp & View Button */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">{email.timestamp || "Just now"}</span>
                <Link
                  href={`/dashboard/email/${email.id}`}
                  className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
                >
                  View →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* View More Button */}
      {emails.length > 5 && (
        <div className="text-center mt-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            View All Emails
          </Link>
        </div>
      )}
    </div>
  );
}
