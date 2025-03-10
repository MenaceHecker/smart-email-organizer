import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req });

    if (!token || typeof token.accessToken !== "string" || !token.accessToken) {
      console.error("Invalid or missing access token:", token);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token.accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    const emailData = await gmail.users.messages.get({
      userId: "me",
      id: params.id,
    });

    const headers = emailData.data.payload?.headers;
    const subject = headers?.find((h) => h.name === "Subject")?.value || "No Subject";
    const sender = headers?.find((h) => h.name === "From")?.value || "Unknown Sender";
    const body = emailData.data.snippet || "No content available.";

    return NextResponse.json({ id: params.id, sender, subject, body });
  } catch (error) {
    console.error("Error fetching email:", error);
    return NextResponse.json({ error: "Failed to fetch email" }, { status: 500 });
  }
}
