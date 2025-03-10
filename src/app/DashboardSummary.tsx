"use client";
import { useEffect, useState } from "react";

interface Email {
  id: number;
  sender: string;
  subject: string;
}

export default function DashboardSummary() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true); // added a loading state

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("/api/emails");
        const data = await res.json();

        console.log("Fetched emails:", data); // debugging the API response

        if (Array.isArray(data)) {
          setEmails(data);
        } else {
          console.error("Unexpected API response:", data);
          setEmails([]);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        setEmails([]);
      } finally {
        setLoading(false); // No loading when request is done
      }
    }
    fetchEmails();
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Emails</h2>

      {loading ? (
        <p>Loading emails...</p> // showing the loading indicator
      ) : emails.length === 0 ? (
        <p>No recent emails.</p>
      ) : (
        <ul>
          {emails.slice(0, 5).map((email) => (
            <li key={email.id} className="p-2 border-b">
              <strong>{email.sender}</strong>: {email.subject}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
