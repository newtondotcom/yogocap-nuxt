import { assignTasktoVideo, createVideo} from "~/server/data/videos";
import { createTask} from "~/server/data/tasks";
import sendAMQP from "~/server/data/ampq";

export default defineEventHandler(async (event) => { 
    const user_id = event.context.user_id;
    const body = await readBody(event);
    
    // Extract required data from the request body
    const {name, aligned, emojis, music, silent, length, name_s3, s3name, position } = body;

    // Create a new video
    const video_id = await createVideo(user_id, name, aligned, emojis, music, silent, length, name_s3, s3name);

    // Create a new task
    const task_id = await createTask(video_id, aligned, emojis, music, silent);

    // Assign the task to the video
    await assignTasktoVideo(video_id, task_id);

    // Send a msg on the queue
    const message = JSON.stringify({"s3_name" : s3name, "file_name": name_s3, "emoji": emojis, "lsilence": silent,"music":music, "video_aligned": aligned, "key_db": task_id, "position" : position});
    await sendAMQP(message);
})
