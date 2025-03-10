"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
}

export default function EmailDetail() {
  const params = useParams();
  const { id } = params;
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmail() {
      try {
        const res = await fetch(`/api/emails/${id}`);
        if (!res.ok) throw new Error("Failed to fetch email");
        const data = await res.json();
        setEmail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEmail();
    }
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading email...</p>;
  if (!email) return <p className="text-center mt-10">Email not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold">{email.subject}</h1>
      <p className="text-gray-600">From: {email.sender}</p>
      <div className="mt-4 border-t pt-4">{email.body}</div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Reply
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Archive
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      </div>

      {/* Back to Inbox */}
      <div className="mt-6">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Back to Inbox
          </button>
        </Link>
      </div>
    </div>
  );
}
