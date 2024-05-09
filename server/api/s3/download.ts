import { createPresignedUrlDownload} from '~/server/data/s3';

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id;
    const body = await readBody(event);
    const video_id = body.video_id;
    const url = await createPresignedUrlDownload(video_id);
    return url;
})