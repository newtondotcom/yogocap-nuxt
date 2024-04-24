import prisma from "./prisma";

export async function createVideo(user_id: any, name: string, aligned : boolean, emojis : boolean, music : boolean, silent : boolean, task_id : string, length : number, name_s3 : string, s3name : string) {
    try {
        const newVideo = await prisma.video.create({
            data: {
                user_id,
                name,
                aligned,
                emojis,
                music,
                silent,
                task_id,
                length,
                name_s3,
                stored : s3name,
                submitted : new Date()
            },
            select : {
                id : true
            }
        });
        return newVideo.id;
    } catch (error : any) {
        throw new Error(`Error creating video: ${error.message}`);
    }
}

export async function setVideoDone(video_id: any, task_id : string, thumbnail : string) {
    try {
        // mark the video as done
        const updatedVideo = await prisma.video.update({
            where: { id: video_id },
            data: {
                task_id,
                done: true,
                thumbnail
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