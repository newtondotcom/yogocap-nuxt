import prisma from "./prisma";

export async function updateAccountAfterVideoDone(user_id: any) {
    try {
        const updatedAccount = await prisma.account.update({
            where: { user_id: user_id },
            data: {
                videos_remaining: {
                    decrement: 1
                },
                videos_stored: {
                    increment: 1
                }
            }
        });
    } catch (error : any) {
        throw new Error(`Error updating account: ${error.message}`);
    }
}