import { getCapacity } from '~/server/data/account';
import { createPresignedUrl } from '~/server/data/s3';

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id;
    const {url,objectName} = await createPresignedUrl(user_id);
    const capacity = await getCapacity(user_id);
    return { url, objectName, capacity};
})