"use client";

import { useEffect, useState } from "react";

interface Email {
  id: number;
  sender: string;
  subject: string;
  body: string;
}

export default function EmailDetail({ params }: { params: { id: string } }) {
  const { id } = params; // extracting the id from the email
  const [email, setEmail] = useState<Email | null>(null);

  useEffect(() => {
    async function fetchEmail() {
      const res = await fetch(`/api/emails/${id}`); // fetching the email by id
      const data = await res.json();
      setEmail(data);
    }
    fetchEmail();
  }, [id]);

  if (!email) return <p className="text-center mt-10">Loading email...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{email.subject}</h1>
      <p className="text-gray-600">{email.sender}</p>
      <p className="mt-4">{email.body}</p>
    </div>
  );
}
