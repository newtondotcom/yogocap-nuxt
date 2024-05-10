import prisma from "./prisma";

const plan_starter = "plan-starter";
const plan_premium = "plan-premium";
const plan_business = "plan-business";

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
    } catch (error: any) {
        throw new Error(`Error updating account: ${error.message}`);
    }
}

export async function getTransactions(user_id: any) {
    try {
        const transactions = await prisma.buyings.findMany({
            where: {
                user_id
            },
            select: {
                date: true,
                plan: true,
                onjoin: true
            }
        });
        return transactions;
    } catch (error: any) {
        throw new Error(`Error getting transactions: ${error.message}`);
    }
}

export async function getCapacity(user_id: any) {
    try {
        const account = await prisma.account.findUnique({
            where: { user_id },
            select: {
                videos_remaining: true,
                can_emojis: true,
                can_music: true,
                current_duration: true,
            }
        });
        account.can_music = false;
        account.can_emojis = false;
        return account;
    } catch (error: any) {
        throw new Error(`Error getting account: ${error.message}`);
    }
}

export async function getCurrentCreditState(user_id: any) {
    try {
        const account = await prisma.account.findUnique({
            where: { user_id },
            select: {
                videos_remaining: true,
                current_duration: true,
            }
        });
        const current_plan = await prisma.buyings.findFirst({
            where: {
                user_id
            },
            select: {
                plan: true
            },
            orderBy: {
                date: 'desc'
            }
        });
        return { account, current_plan };
    } catch (error: any) {
        throw new Error(`Error getting account: ${error.message}`);
    }
}

export async function setNewUser(user_id: any) {
    try {
        const test = await prisma.account.findUnique({
            where: { user_id },
            select: {
                deletion: true
            }
        });
        if (test) {
            if (test.deletion){
                return "deleted";
            }
            return "exists";
        }
        await prisma.account.create({
            data: {
                user_id,
                videos_remaining: 60,
                videos_stored: 0,
                can_emojis: false,
                can_music: true,
                current_duration: 180
            }
        });
        await prisma.buyings.create({
            data: {
                user_id,
                date: new Date(),
                plan: plan_starter,
                onjoin: true
            }
        });
        console.log(`New user ${user_id} created in db`);
    } catch (error: any) {
        throw new Error(`Error creating account: ${error.message}`);
    }
}

export async function setPlanPurchased(user_id: any, plan: string) {
    try {
        await prisma.buyings.create({
            data: {
                user_id,
                date: new Date(),
                plan,
                onjoin: false
            }
        });
        if (plan == "plan-starter") {
            await prisma.account.update({
                where: { user_id },
                data: {
                    videos_remaining: {
                        increment: 60
                    },
                    current_duration: 180
                }
            });
        }
        if (plan == "plan-premium") {
            await prisma.account.update({
                where: { user_id },
                data: {
                    videos_remaining: {
                        increment: 120
                    },
                    can_emojis: true,
                    current_duration: 15 * 60
                }
            });
        }
        if (plan == "plan-business") {
            await prisma.account.update({
                where: { user_id },
                data: {
                    videos_remaining: {
                        increment: 300
                    },
                    can_emojis: true,
                    current_duration: 60 * 60
                }
            });
        }
    } catch (error: any) {
        throw new Error(`Error updating account: ${error.message}`);
    }
}