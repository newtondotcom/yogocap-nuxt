import { setVideoDone } from "~/server/data/videos";
import { updateTask } from "../../data/tasks";
import { updateAccountAfterVideoDone } from "~/server/data/account";
import { sendEmailOnVideoDone } from "~/server/data/mail";

export default defineEventHandler(async (event) => {  
    // Read the request body
    const body = await readBody(event);
    
    // Extract required data from the request body
    const task_id = body.task_id;
    const time_transcription = body.time_transcription;
    const time_alignment = body.time_alignment;
    const time_encoding = body.time_encoding;
    const done_at = body.done_at;
    const thumbnail = body.thumbnail;

    // Update the task data
    const video_id = await updateTask(task_id, time_transcription, time_alignment, time_encoding, done_at);
    // Set the video as done
    const user_id = await setVideoDone(video_id, task_id, thumbnail);
    // Update the account data
    await updateAccountAfterVideoDone(user_id);
    // Send an email to the user
    await sendEmailOnVideoDone(user_id,video_id);
})
