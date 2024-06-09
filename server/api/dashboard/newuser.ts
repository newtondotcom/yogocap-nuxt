import { setNewUser } from "~/server/data/account";
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id;
    const user = await serverSupabaseUser(event);
    const email = user?.user_metadata.email;
    const state = await setNewUser(user_id,email);
    return state;
  })