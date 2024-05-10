import { setNewUser } from "~/server/data/account";

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id
    const state = await setNewUser(user_id);
    return state;
  })