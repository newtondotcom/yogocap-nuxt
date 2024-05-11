import prisma from "./prisma";

export async function lists3(apikey: string) {
    const keys = await prisma.api.findMany();
    if (keys.some((key) => key.key === apikey)) {
        return await prisma.s3.findMany();
    }
    return [];
}