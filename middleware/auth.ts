export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/auth/login') {
        const user = useSupabaseUser();
        if (!user.value) {
            return navigateTo('/auth/login');
        }
    }
});
