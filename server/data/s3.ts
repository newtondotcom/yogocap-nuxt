import { Client } from 'minio';
import prisma from './prisma';

const bucketName = 'videos';
const config = useRuntimeConfig();
const MINIO_ENDPOINT = config.MINIO_ENDPOINT;
const MINIO_PORT = config.MINIO_PORT;
const MINIO_ACCESS_KEY = config.MINIO_ACCESSKEY;
const MINIO_SECRET_KEY = config.MINIO_SECRETKEY;


export default function generateUniqueName() {
    let date = new Date();
    let timestamp = date.getTime();
    let randomString = Math.random().toString(36).substring(2, 8); 
    let uniqueName = `${timestamp}_${randomString}`;
    return uniqueName;
}

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

export async function createPresignedUrl(user_id:any){
    const minioClient = new Client({
        endPoint: MINIO_ENDPOINT,
        port: parseInt(MINIO_PORT),
        useSSL: false,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
    });
    const objectName = generateUniqueName()+'.mp4';
    const expiryInSeconds = 3600;
    const url =  await minioClient.presignedPutObject(bucketName, objectName, expiryInSeconds);
    return {url, objectName};
}