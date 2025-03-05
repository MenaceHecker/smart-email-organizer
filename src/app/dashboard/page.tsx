"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link"; // link used here for navigation

interface Email {
  id: number;
  sender: string;
  subject: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    async function fetchEmails() {
      const res = await fetch("/api/emails");
      const data: Email[] = await res.json();
      setEmails(data);
    }
    fetchEmails();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">Email Organizer</h2>
        <ul>
          <li className="p-2 hover:bg-gray-700">Inbox</li>
          <li className="p-2 hover:bg-gray-700">Starred</li>
          <li className="p-2 hover:bg-gray-700">Sent</li>
          <li className="p-2 hover:bg-gray-700">Drafts</li>
          <li className="p-2 hover:bg-gray-700">Trash</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name}!</h1>

        {/* Email List */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Your Emails</h2>
          {emails.length === 0 ? (
            <p>No emails found.</p>
          ) : (
            <ul>
              {emails.map((email) => (
                <li key={email.id} className="p-2 border-b">
                  <Link href={`/dashboard/email/${email.id}`} className="text-blue-500 hover:underline">
                    <strong>{email.sender}</strong>: {email.subject}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
