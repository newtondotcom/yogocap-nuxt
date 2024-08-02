import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const path = event.path.split('/');
    if (
        path?.includes('auth') ||
        path?.includes('wakeup') ||
        (path[0] == '' && path[1].includes('code'))
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
            throw new Error('Unauthorized');
        }
    }
});
