import { serverSupabaseUser } from '#supabase/server';
import {
    getCurrentCreditState,
    getTransactions,
    setNewUser,
    updateAccountAfterVideoDone,
} from '~/server/data/account';
import sendAMQP from '~/server/data/ampq';
import { sendEmailOnVideoDone } from '~/server/data/mail';
import { verifyApiKey } from '~/server/data/miscs';
import { setSupportTicket } from '~/server/data/support';
import { createTask, updateTask } from '~/server/data/tasks';
import {
    assignTasktoVideo,
    createVideo,
    getVideos,
    getVideosHistory,
    setVideoDone,
} from '~/server/data/videos';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const operation = getRouterParam(event, 'operation');
    try {
        switch (operation) {
            case 'credit':
                return credit(event);
            case 'history':
                return history(event);
            case 'newuser':
                return newuser(event);
            case 'postvideo':
                return postvideo(event);
            case 'pvideos':
                return pvideos(event);
            case 'support':
                return support(event);
            case 'tasks':
                return tasks(event);
            default:
                setResponseStatus(event, 404, 'Not Found');
                return 'Not Found';
        }
    } catch (e) {
        setResponseStatus(event, 500, 'Internal Server Error');
        return e.message;
    }
});

async function credit(event: H3Event) {
    const user_id = event.context.user_id;
    const data = await getCurrentCreditState(user_id);
    return data;
}

async function history(event: H3Event) {
    const user_id = event.context.user_id;
    const videos = await getVideosHistory(user_id);
    const transactions = await getTransactions(user_id);

    return {
        videos,
        transactions,
    };
}

async function newuser(event: H3Event) {
    const user_id = event.context.user_id;
    const user = await serverSupabaseUser(event);
    const email = user?.user_metadata.email;
    const state = await setNewUser(user_id, email);
    return state;
}

async function postvideo(event: H3Event) {
    const user_id = event.context.user_id;
    const body = await readBody(event);

    // Extract required data from the request body
    const { name, aligned, emojis, music, silent, length, name_s3, s3name, position } = body;

    // Create a new video
    const video_id = await createVideo(
        user_id,
        name,
        aligned,
        emojis,
        music,
        silent,
        length,
        name_s3,
        s3name,
    );

    // Create a new task
    const task_id = await createTask(video_id, aligned, emojis, music, silent);

    // Assign the task to the video
    await assignTasktoVideo(video_id, task_id);

    // Send a msg on the queue
    const message = JSON.stringify({
        s3_name: s3name,
        file_name: name_s3,
        emoji: emojis,
        lsilence: silent,
        music: music,
        video_aligned: aligned,
        key_db: task_id,
        position: position,
    });
    await sendAMQP(message);
}

async function pvideos(event: H3Event) {
    const user_id = event.context.user_id;
    const videos = await getVideos(user_id);
    return {
        pvideos: videos,
    };
}

async function support(event: H3Event) {
    const user_id = event.context.user_id;
    const body = await readBody(event);
    const title = body.title;
    const message = body.message;
    const email = body.email;
    await setSupportTicket(user_id, title, message, email);
}

async function tasks(event: H3Event) {
    // Check the API key
    const headers = new Headers(event.headers);
    const authorization = headers.get('authorization');
    const first_part = authorization.split(' ')[0] == 'Bearer';
    if (!first_part) {
        return 'Not Authorized';
    }
    const apikey = authorization.split(' ')[1];
    const valid = verifyApiKey(apikey);
    if (!first_part || !valid) {
        return new Response('Unauthorized', { status: 401 });
    }

    // Read the request body
    const body = await readBody(event);

    // Extract required data from the request body
    const task_id = body.task_id;
    const time_transcription = body.time_transcription;
    const time_alignment = body.time_alignment;
    const time_encoding = body.time_encoding;
    const done_at = new Date(body.done_at);
    const thumbnail = body.thumbnail;

    // Update the task data
    const video_id = await updateTask(
        task_id,
        time_transcription,
        time_alignment,
        time_encoding,
        done_at,
    );
    // Set the video as done
    const user_id = await setVideoDone(video_id, task_id, thumbnail);
    // Update the account data
    await updateAccountAfterVideoDone(user_id);
    // Send an email to the user
    await sendEmailOnVideoDone(user_id, video_id);
}
