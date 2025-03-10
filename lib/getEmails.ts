import { google } from "googleapis";

export async function getEmails(accessToken: string) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    // fetching latest 10 emails
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    const messages = response.data.messages || [];

    //fetching full email data
    const emails = await Promise.all(
      messages.map(async (msg) => {
        const emailData = await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
        });

        const headers = emailData.data.payload?.headers;
        const subject = headers?.find((h) => h.name === "Subject")?.value || "No Subject";
        const sender = headers?.find((h) => h.name === "From")?.value || "Unknown Sender";

        return {
          id: msg.id,
          sender,
          subject,
        };
      })
    );

    return emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
}
