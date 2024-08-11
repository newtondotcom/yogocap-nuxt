import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const path = event.path;
    if (
        (path === '/auth/login') ||
        path.includes('/?code=') ||
        (path === '/api/wakeup') ||
        (path === "/api/s3/list")
    ) {
        return;
    } else {
        try {
            const user = await serverSupabaseUser(event);
            if (user) {
                event.context.user_id = user.id;
            }
        } catch (error) {
            console.error('Route fetched : ' + event.path);
            console.error('Error in auth middleware:', error);
            await sendRedirect(event, '/auth/login', 302);
        }
    }
});
