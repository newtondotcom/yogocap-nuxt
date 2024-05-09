import { getCurrentCreditState } from "~/server/data/account";

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id
    const data = await getCurrentCreditState(user_id);
    return data;
  })