import prisma from "./prisma";

export async function deleteAccount(user_id:any){
    try {
        await prisma.account.update({
            where: { user_id },
            data: {
                deletion: true
            }
        });
    } catch (error: any) {
        throw new Error(`Error deleting account: ${error.message}`);
    }
}

export async function sendWebhookUserDeleted(user_id: any) {
    const data = {
      "content": `**Nouvelle demande de suppression de compte ** ouverte par : ${user_id}`,
      "username": "Yogocap support"
    };

    const config = useRuntimeConfig();
  
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

export async function verifyApiKey(apikey: string) {
    const keys = await prisma.api.findMany();
    return keys.some((key) => key.key === apikey);
}