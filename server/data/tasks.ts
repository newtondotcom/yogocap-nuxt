import prisma from "~/server/data/prisma";

export async function createTask(video_id: any, aligned: boolean, emojis: boolean, music: boolean, silent: boolean) {
    try {
        const newTask = await prisma.task.create({
            data: {
                video_id,
                aligned,
                emojis,
                music,
                silent
            },
            select: {
                id: true
            }
        });
        return newTask.id;
    } catch (error: any) {
        throw new Error(`Error creating task: ${error.message}`);
    }
}

export async function updateTask(task_id: any, time_transcription: any, time_alignment: any, time_encoding: any, done_at: any) {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: task_id },
            data: {
                time_transcription,
                time_alignment,
                time_encoding,
                done_at
            },
            select: {
                video_id: true
            }
        });
        return updatedTask.video_id;
    } catch (error: any) {
        throw new Error(`Error updating task: ${error.message}`);
    }
}