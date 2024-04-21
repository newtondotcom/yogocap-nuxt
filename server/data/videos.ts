import prisma from "./prisma";

export async function setVideoDone(video_id: any, task_id : string) {
    try {
        // mark the video as done
        const updatedVideo = await prisma.video.update({
            where: { id: video_id },
            data: {
                task_id
            },
            select : {
                user_id : true
            }
        });

        const user_id = updatedVideo.user_id;
        const addVideoDone = await prisma.account.update({
            where: { user_id: user_id },
            data: {
                videos_done: {
                    increment: 1
                }
            }
        });
        return user_id;
    } catch (error : any) {
        throw new Error(`Error updating video: ${error.message}`);
    }
}