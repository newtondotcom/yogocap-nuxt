import prisma from "./prisma";

export async function createVideo(user_id: any, name: string, aligned: boolean, emojis: boolean, music: boolean, silent: boolean, length: number, name_s3: string, s3name: string) {
    try {
        const newVideo = await prisma.video.create({
            data: {
                user_id,
                name,
                aligned,
                emojis,
                music,
                silent,
                length,
                name_s3,
                stored: s3name,
                submitted: new Date(),
                deleted: false,
            },
            select: {
                id: true
            }
        });
        const addVideoDone = await prisma.account.update({
            where: { user_id: user_id },
            data: {
                videos_stored: {
                    increment: 1
                },
                videos_remaining: {
                    decrement: 1
                }
            }
        });
        return newVideo.id;
    } catch (error: any) {
        throw new Error(`Error creating video: ${error.message}`);
    }
}

export async function assignTasktoVideo(video_id: any, task_id: string) {
    try {
        const updatedVideo = await prisma.video.update({
            where: { id: video_id },
            data: {
                task_id
            },
            select: {
                user_id: true
            }
        });
        return updatedVideo.user_id;
    } catch (error: any) {
        throw new Error(`Error updating video: ${error.message}`);
    }
}

export async function setVideoDone(video_id: any, task_id: string, thumbnail: string) {
    try {
        // mark the task as done
        await prisma.task.update({
            where: { id: task_id },
            data: {
                done: true
            }
        });
        // mark the video as done
        const updatedVideo = await prisma.video.update({
            where: { id: video_id },
            data: {
                task_id,
                done: true,
                thumbnail
            },
            select: {
                user_id: true
            }
        });
        return updatedVideo.user_id;
    } catch (error: any) {
        throw new Error(`Error updating video: ${error.message}`);
    }
}

export async function getVideos(user_id: any) {
    try {
        const videos = await prisma.video.findMany({
            where: {
                user_id
            },
            select: {
                id: true,
                name: true,
                aligned: true,
                emojis: true,
                music: true,
                silent: true,
                length: true,
                thumbnail: true,
                done: true,
                deleted: true,
                submitted: true,
                name_s3: true,
            },
            orderBy: {
                submitted: 'desc'
            }
        });
        videos.forEach((video: any) => {
            if (video.done) {
                video.thumbnail = "http://144.91.123.186:31008/thumbnails/" + video.name_s3.replace('.mp4', '.jpg');
            }
        })
        return videos;
    } catch (error: any) {
        throw new Error(`Error getting videos: ${error.message}`);
    }
}

export async function getVideosHistory(user_id: any) {
    try {
        const videos = await prisma.video.findMany({
            where: {
                user_id
            },
            select: {
                id: true,
                name: true,
                aligned: true,
                emojis: true,
                music: true,
                silent: true,
                length: true,
                submitted: true,
            }
        });
        return videos;
    } catch (error: any) {
        throw new Error(`Error getting videos: ${error.message}`);
    }
}