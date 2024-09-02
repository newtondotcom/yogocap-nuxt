<script setup lang="ts">
    definePageMeta({ layout: false });

    const supabase = useSupabaseClient();

    let redirect = '/invalidonpurpose';
    if (window.location.hostname === 'localhost') {
        redirect = 'http://localhost:3000';
    }

    const signInWithGoogle = async () => {
        console.log('signing in with google');
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirect,
                },
            });
            if (error) {
                console.error('Google Sign-In Error:', error);
                return;
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    const signInWithGithub = async () => {
        console.log('signing in with github');
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: redirect,
                },
            });
            if (error) {
                console.error('Github Sign-In Error:', error);
                return;
            }
        } catch (error) {
            console.error('Github Sign-In Error:', error);
        }
    };

    const signInWithDiscord = async () => {
        console.log('signing in with discord');
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
                options: {
                    redirectTo: redirect,
                },
            });
            if (error) {
                console.error('Discord Sign-In Error:', error);
                return;
            }
        } catch (error) {
            console.error('Discord Sign-In Error:', error);
        }
    };
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-2xl">Connect with us</CardTitle>
                <CardDescription>
                    Use one of the following methods to log in or register
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <Button variant="outline" class="w-full" @click="signInWithGoogle">
                        <svg class="w-6 h-6 mx-2" viewBox="0 0 40 40">
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#FFC107"
                            />
                            <path
                                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                fill="#FF3D00"
                            />
                            <path
                                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                fill="#4CAF50"
                            />
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#1976D2"
                            />
                        </svg>
                        Login with Google
                    </Button>
                    <Button variant="outline" class="w-full" @click="signInWithGithub">
                        <svg class="w-10 h-10 pt-2 -mr-2" viewBox="0 0 40 40">
                            <title>GitHub</title>
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            />
                        </svg>
                        Login with Github
                    </Button>
                    <Button variant="outline" class="w-full" @click="signInWithDiscord">
                        <svg class="w-10 h-10 pt-3 -mr-2" viewBox="0 0 40 40">
                            <title>Discord</title>
                            <path
                                d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                            />
                        </svg>
                        Login with Discord
                    </Button>
                </div>
                <div class="mt-4 text-center text-sm">
                    By signing in, you agree to our
                    <NuxtLink class="text-gray-500 underline" to="https://yogocap.com/tos">
                        Terms of Service
                    </NuxtLink>
                    and
                    <NuxtLink to="https://yogocap.com/privacy" class="text-gray-500 underline">
                        Privacy Policy
                    </NuxtLink>
                    <br />

                    <span class="text-xs">
                        we won't collect any of your data or send you promotional email, don't worry
                        ! You can check, this is open source 😊
                    </span>
                </div>
                <!--
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <NuxtLink to="/auth/register" class="underline">
                        Sign up
                    </NuxtLink>
                </div>
                -->
            </CardContent>
        </Card>
    </div>
</template>
