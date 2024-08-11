import { lists3 } from '~/server/data/list';

export default defineEventHandler(async (event) => {
    const headers = new Headers(event.headers);
    const authorization = headers.get('authorization');
    const first_part = authorization.split(' ')[0] == 'Bearer';
    if (first_part == false) {
        await setResponseStatus(event, 401);
    }
    const apikey = authorization.split(' ')[1];
    const s3s = await lists3(apikey);
    return s3s;
})