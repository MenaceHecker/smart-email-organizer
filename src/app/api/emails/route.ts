import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  // ✅ DEBUG LOG
  console.log("🧪 Decoded Token:", token);

  if (!token || typeof token.accessToken !== "string") {
    console.error("❌ No valid access token:", token);
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token.accessToken });

    const gmail = google.gmail({ version: "v1", auth });
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
    });

    const messages = response.data.messages || [];
    const emails = await Promise.all(
      messages.map(async (msg) => {
        const detail = await gmail.users.messages.get({ userId: "me", id: msg.id! });
        const headers = detail.data.payload?.headers || [];
        const subject = headers.find((h) => h.name === "Subject")?.value || "No Subject";
        const from = headers.find((h) => h.name === "From")?.value || "Unknown Sender";
        return { id: msg.id!, sender: from, subject };
      })
    );

    return new Response(JSON.stringify(emails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("❌ Gmail API error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
