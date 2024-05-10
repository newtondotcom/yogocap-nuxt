import { getCapacity } from '~/server/data/account';
import { createPresignedUrlUpload } from '~/server/data/s3';

export default defineEventHandler(async (event) => {
    const user_id = event.context.user_id;
    const {url,objectName, s3Name} = await createPresignedUrlUpload(user_id);
    const capacity = await getCapacity(user_id);
    return { url, objectName, capacity,s3Name};
})