import { setSupportTicket } from "~/server/data/support";


export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id
    const body = await readBody(event);
    const title = body.title;
    const message = body.message;
    const email = body.email;
    await setSupportTicket(user_id, title, message, email);
  })