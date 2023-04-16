const { google } = require("googleapis");
const { OAuth2 } = google.auth;

// Set up the OAuth2 client
const oAuth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// Set the access token for the client
oAuth2Client.setCredentials({
  access_token: YOUR_ACCESS_TOKEN,
  refresh_token: YOUR_REFRESH_TOKEN,
  scope: "https://www.googleapis.com/auth/gmail.modify",
  token_type: "Bearer",
  expiry_date: YOUR_EXPIRY_DATE,
});

// Set the Gmail API version
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// Set the label name to be used
const labelName = "Your Label Name";

// Function to add a label to an email
async function addLabelToEmail(emailId) {
  // Check if the label exists
  const labelResponse = await gmail.users.labels.list({ userId: "me" });
  const labelExists = labelResponse.data.labels.some(
    (label) => label.name === labelName
  );

  // Create the label if it doesn't exist
  if (!labelExists) {
    await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        name: labelName,
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      },
    });
  }

  // Add the label to the email
  await gmail.users.messages.modify({
    userId: "me",
    id: emailId,
    requestBody: {
      addLabelIds: [labelName],
      removeLabelIds: ["INBOX"],
    },
  });
}

// Function to check for new emails and reply to them
async function checkAndReplyToEmails() {
  try {
    // Retrieve the unread emails in the Inbox
    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX", "UNREAD"],
    });
    const emails = response.data.messages;

    // Check if there are any new emails to reply to
    if (emails && emails.length) {
      for (const email of emails) {
        // Check if the email has already been replied to
        const threadResponse = await gmail.users.threads.get({
          userId: "me",
          id: email.threadId,
        });
        const thread = threadResponse.data;

        const isReplied = thread.messages.some((message) => {
          return (
            message.labelIds.includes("SENT") &&
            message.payload.headers.find((header) => header.name === "From")
              .value === "your.email@example.com"
          );
        });

        // If the email has not been replied to, send a reply
        if (!isReplied) {
          await sendReply(email.id);

          // Add the label to the email
          await addLabelToEmail(email.id);
        }
      }
    }
  } catch (error) {
    console.error("Error occurred: ", error);
  } finally {
    // Wait for a random interval between 45-120 seconds before checking for new emails again
    const interval = Math.floor(Math.random() * (120 - 45 + 1) + 45) * 1000;
    setTimeout(checkAndReplyToEmails, interval);
  }
}

// Function to send a reply to an email
async function sendReply(emailId) {
    const gmail = google.gmail({ version: 'v1', auth: emailId });
  const messageParts = [
    `Hi ${from.split(' ')[0]},`,
    `Thank you for your email. I'm currently out of the office and will get back to you as soon as possible.`,
    `Best regards,`,
    `Admin`,
  ];
  const message = messageParts.join('\n');
  const utf8Message = Buffer.from(message, 'utf-8').toString('base64');
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      threadId: threadId,
      raw: utf8Message,
    },
  });
}
