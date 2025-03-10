"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Email {
  id: string;
  sender: string;
  subject: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      try {
        setLoading(true);
        const res = await fetch("/api/emails");
        if (!res.ok) throw new Error("Failed to fetch emails");
        const data: Email[] = await res.json();
        setEmails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchEmails();
    }
  }, [session]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-900 text-white p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">📂 Email Organizer</h2>
        <ul>
          <li className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">📥 Inbox</li>
          <li className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">⭐ Starred</li>
          <li className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">📤 Sent</li>
          <li className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">📝 Drafts</li>
          <li className="p-3 hover:bg-gray-700 rounded-md cursor-pointer">🗑️ Trash</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name}!</h1>

        {/* Loading Indicator */}
        {loading && <p className="text-gray-500">Loading emails...</p>}

        {/* Email List */}
        <div className="bg-white shadow-md p-4 rounded-lg transition-all hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-4">📩 Your Emails</h2>
          {emails.length === 0 ? (
            <p className="text-gray-500">No emails found.</p>
          ) : (
            <ul>
              {emails.map((email) => (
                <li
                  key={email.id}
                  className="p-3 border-b hover:bg-gray-100 transition-all rounded-md flex justify-between"
                >
                  <div>
                    <strong>{email.sender}</strong>: {email.subject}
                  </div>
                  <Link href={`/dashboard/email/${email.id}`} className="text-blue-500 hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Button to View More Emails */}
        {emails.length > 5 && (
          <div className="mt-4">
            <Link href="/dashboard/all-emails">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                View All Emails
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
