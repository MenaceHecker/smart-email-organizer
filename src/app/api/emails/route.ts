import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: "v1", auth });
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
    });

    const messages = response.data.messages || [];
    const emails = await Promise.all(
      messages.map(async (msg) => {
        const emailData = await gmail.users.messages.get({ userId: "me", id: msg.id! });
        const headers = emailData.data.payload?.headers || [];
        const subject = headers.find((h) => h.name === "Subject")?.value || "No Subject";
        const from = headers.find((h) => h.name === "From")?.value || "Unknown Sender";
        return { id: msg.id, sender: from, subject };
      })
    );

    return new Response(JSON.stringify(emails), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching emails:", error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return new Response(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
    }
  }
}