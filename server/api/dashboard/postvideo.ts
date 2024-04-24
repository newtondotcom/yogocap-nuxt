import { createVideo} from "~/server/data/videos";
import { createTask} from "~/server/data/tasks";
import sendAMQP from "~/server/data/ampq";

export default defineEventHandler(async (event) => { 
    const body = await readBody(event);
    
    // Extract required data from the request body
    const { user_id, video_id, name, aligned, emojis, music, silent, length, name_s3, s3name } = JSON.parse(body);
    
    // Create a new task
    const task_id = await createTask(video_id, aligned, emojis, music, silent);

    // Create a new video
    await createVideo(user_id, name, aligned, emojis, music, silent, task_id, length, name_s3, s3name);

    // Send a msg on the queue
    const message = JSON.stringify({ "file_name": name, "emoji": emojis, "lsilence": silent, "video_aligned": aligned, "key_db": task_id });
    await sendAMQP(message);
})
