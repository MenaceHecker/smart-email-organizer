import { NextResponse } from "next/server";

interface Email {
  id: number;
  sender: string;
  subject: string;
}

export async function GET() {
  const emails: Email[] = [
    { id: 1, sender: "joe@example.com", subject: "Meeting jimmy Reminder" },
    { id: 2, sender: "amazon@shopping.com", subject: "Your order has shipped!" },
    { id: 3, sender: "newsletter@tech.com", subject: "Latest Tech Updates" },
  ];

  return NextResponse.json(emails);
}
