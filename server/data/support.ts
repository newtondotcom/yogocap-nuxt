import prisma from "./prisma";

const config = useRuntimeConfig();

export async function sendWebhookSupportTicket(user_id: any, title: any, message: any, email: any) {
  const data = {
    "content": `**Nouveau ticket support** ouvert par : ${user_id}`,
    "username": "Yogocap support",
    "embeds": [
      {
        "title": title,
        "description": message,
        "color": 16711680,
        "fields": [
          {
            "name": "Email to be contacted",
            "value": email
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(config.DISCORD_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(`Webhook sent for ${user_id}`);
  } catch (error) {
    console.error("Failed to send webhook:", error);
  }
}

export async function setSupportTicket(user_id: any, title: any, message: any, email: any) {
  try {
    await prisma.support.create({
      data: {
        user_id: user_id,
        title: title,
        message: message,
        email: email,
        date: new Date()
      }
    });
    await sendWebhookSupportTicket(user_id, title, message, email);
  } catch (error) {
    console.error(error);
  }
}