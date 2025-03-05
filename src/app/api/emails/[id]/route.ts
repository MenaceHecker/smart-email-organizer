import { NextResponse } from "next/server";

const emails = [
  { id: 1, sender: "john@example.com", subject: "Meeting Reminder", body: "Don't forget our meeting tomorrow at 10 AM." },
  { id: 2, sender: "amazon@shopping.com", subject: "Your order has shipped!", body: "Your order has been shipped and is on the way!" },
  { id: 3, sender: "newsletter@tech.com", subject: "Latest Tech Updates", body: "Here's the latest in tech news..." },
];

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const email = emails.find((e) => e.id === parseInt(params.id));
  if (!email) return NextResponse.json({ error: "Email not found" }, { status: 404 });

  return NextResponse.json(email);
}
