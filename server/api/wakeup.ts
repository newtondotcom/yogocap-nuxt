import { defineEventHandler } from 'h3';

import prisma from '../data/prisma';

export default defineEventHandler(async (event) => {
    const user = await prisma.api.create({
        data: {
            key: 'wakeup',
        },
        select: {
            id: true,
        },
    });
    await prisma.api.delete({
        where: {
            id: user.id,
        },
    });

    return {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    };
});
