import { Client } from 'minio';
import prisma from './prisma';

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'localhost';
const MINIO_PORT = process.env.MINIO_PORT || '9000';
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS || 'minioadmin';
const MINIO_SECRET_KEY = process.env.MINIO_SECRET || 'minioadmin';

async function removeVideo(videoId: string) {
    try {
        // get video object from database
        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
            select: {
                name_s3: true,
                user_id: true
            }
        });

        // remove video object from MinIO
        const minioClient = new Client({
            endPoint: MINIO_ENDPOINT,
            port: parseInt(MINIO_PORT),
            useSSL: false,
            accessKey: MINIO_ACCESS_KEY,
            secretKey: MINIO_SECRET_KEY,
        });
        const bucketName = 'videos';
        const objectName = video.name_s3;
        minioClient.removeObject(bucketName, objectName, (err) => {
            if (err) {
                console.error('Error removing video object:', err);
            } else {
                console.log('Video object removed successfully:', objectName);
            }
        });

        // remove 1 videos for the current number of videos stored
        await prisma.account.update({
            where: { user_id: video.user_id },
            data: {
                videos_stored: {
                    decrement: 1
                },
            },
        });
    } catch (error) {
        console.error('Error removing video:', error);
    }
}
