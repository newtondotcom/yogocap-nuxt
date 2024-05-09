import { setNewUser } from "~/server/data/account";

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id
    await setNewUser(user_id);
    console.log("User created successfully");
    return {
        message: "User created successfully"
    }
  })