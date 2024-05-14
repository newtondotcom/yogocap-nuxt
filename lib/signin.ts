const supabase = useSupabaseClient();

export default async function processSignIn() {
    const user = useSupabaseUser();
    if (user.value) {
        navigateTo('/dashboard');
    } else {
        navigateTo('/auth/login');
    }
}