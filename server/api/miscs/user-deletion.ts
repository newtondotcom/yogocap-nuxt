import { deleteAccount } from "~/server/data/miscs";

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id
    await deleteAccount(user_id);
    console.log("User created successfully");
    return {
        message: "User created successfully"
    }
  })