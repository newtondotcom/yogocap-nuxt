import { getCapacity } from '~/server/data/account';
import { lists3 } from '~/server/data/list';
import {
    createPresignedUrlDownload,
    createPresignedUrlUpload,
    removeVideo,
} from '~/server/data/s3';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const operation = getRouterParam(event, 'operation');
    try {
        switch (operation) {
            case 'upload':
                return upload(event);
            case 'list':
                return list(event);
            case 'remove':
                return remove(event);
            case 'download':
                return download(event);
            default:
                setResponseStatus(event, 404, 'Not Found');
                return 'Not Found';
        }
    } catch (e) {
        setResponseStatus(event, 500, 'Internal Server Error');
        return e.message;
    }
});

async function download(event: H3Event) {
    const user_id = event.context.user_id;
    const body = await readBody(event);
    const video_id = body.video_id;
    const url = await createPresignedUrlDownload(user_id, video_id);
    return url;
}

async function list(event: H3Event) {
    const headers = new Headers(event.headers);
    const authorization = headers.get('authorization');
    const first_part = authorization.split(' ')[0] == 'Bearer';
    if (!first_part) {
        return 'Not Authorized';
    }
    const apikey = authorization.split(' ')[1];
    const s3s = await lists3(apikey);
    return s3s;
}

async function remove(event: H3Event) {
    const user_id = event.context.user_id;
    const body = await readBody(event);
    const video_id = body.video_id;
    await removeVideo(user_id, video_id);
    return 'Video removed';
}

async function upload(event: H3Event) {
    const user_id = event.context.user_id;
    const { url, objectName, s3Name } = await createPresignedUrlUpload(user_id);
    const capacity = await getCapacity(user_id);
    return { url, objectName, capacity, s3Name };
}
