import prisma from "./prisma";
import constants from "~/lib/constants";

export async function updateAccountAfterVideoDone(user_id: any) {
    try {
        await prisma.account.update({
            where: { user_id },
            data : {
                videos_stored : {
                    increment : 1
                }
            }
        });
        // videos remaining is decremented when the video is submitted
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
            },
            orderBy: {
                date: 'desc'
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

export async function setNewUser(user_id: any , email : any) {
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
                videos_remaining: constants.NB_VIDEOS_JOIN,
                videos_stored: 0,
                can_emojis: false,
                can_music: false,
                current_duration: constants.DURATION_JOIN,
                email : email
            }
        });
        await prisma.buyings.create({
            data: {
                user_id,
                date: new Date(),
                plan: constants.SLUG_PLAN_JOIN,
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
        const slug_plan = plan === constants.NAME_PLAN_SLOW ? constants.SLUG_PLAN_SLOW : plan === constants.NAME_PLAN_MEDIUM ? constants.SLUG_PLAN_MEDIUM : constants.SLUG_PLAN_FAST;
        await prisma.buyings.create({
            data: {
                user_id,
                date: new Date(),
                plan : slug_plan,
                onjoin: false
            }
        });
        if (plan == constants.NAME_PLAN_SLOW){
            await prisma.account.update({
                where: { user_id },
                data: {
                    videos_remaining: {
                        increment: constants.NB_VIDEOS_SLOW
                    },
                    current_duration: constants.DURATION_SLOW,
                    can_emojis : constants.CAN_EMOJIS_SLOW,
                }
            });
        }
        if (plan == constants.NAME_PLAN_MEDIUM) {
            await prisma.account.update({
                where: { user_id },
                data: {
                    videos_remaining: {
                        increment: constants.NB_VIDEOS_MEDIUM
                    },
                    can_emojis: constants.CAN_EMOJIS_MEDIUM,
                    current_duration: constants.DURATION_MEDIUM,
                }
            });
        }
        if (plan == constants.NAME_PLAN_FAST) {
            await prisma.account.update({
                where: { user_id },
                data: {
                    videos_remaining: {
                        increment: constants.NB_VIDEOS_FAST
                    },
                    can_emojis: constants.CAN_EMOJIS_FAST,
                    current_duration: constants.DURATION_FAST
                }
            });
        }
    } catch (error: any) {
        throw new Error(`Error updating account: ${error.message}`);
    }
}