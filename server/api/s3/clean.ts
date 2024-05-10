import { cleanAllS3 } from "~/server/data/cleans3"

//COULD BE DONE USING BUILT IN S3 LIFECYCLE POLICY
export default defineEventHandler(async (event) => {
    await cleanAllS3();
})