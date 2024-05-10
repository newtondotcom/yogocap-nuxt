import { Client } from 'minio';
import prisma from './prisma';

const dayBeforeDelete = 1;

export async function cleanAllS3() {
    try {
        const s3s = await prisma.s3.findMany({
            where: {
                NOT: {
                    name: "thumbnails"
                }
            }
        });
        s3s.forEach(async (s3) => {
            await cleanS3(s3)
        })
    } catch (err) {
        console.log(err)
    }
    return 'Done'
}

async function cleanS3(bucket) {
    console.log('Cleaning bucket: ' + bucket.name);
    const minioClient = new Client({
        endPoint: bucket.endpoint,
        port: bucket.port,
        useSSL: bucket.ssl,
        accessKey: bucket.access_key,
        secretKey: bucket.secret_key,
    });
    const bucketName = bucket.bucket;

    try {
        const list = await minioClient.listObjects(bucket.name, '', true);
        const objects = list.map((obj) => obj.name);
        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];
            const date = obj.split('_')[0];
            const objDate = new Date(date);
            const today = new Date();
            const diff = today - objDate;
            const days = diff / (1000 * 60 * 60 * 24);
            if (days > dayBeforeDelete) {
                await minioClient.removeObject(bucketName, obj);
                console.log('Object removed: ' + obj);
            }
        }
        console.log('Cleaning done for bucket: ' + bucket.name);
    } catch (err) {
        console.log(err);
    }
}
