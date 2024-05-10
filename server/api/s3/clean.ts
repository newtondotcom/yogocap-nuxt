import { cleanAllS3 } from "~/server/data/cleans3"

export default defineEventHandler(async (event) => {
    await cleanAllS3();
})