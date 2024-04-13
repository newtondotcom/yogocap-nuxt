<script lang="ts" setup>
import {AlertCircle} from 'lucide-vue-next';

definePageMeta({
    layout: false,
})

const supabase = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const success = ref(false);
const errorMessage = ref('');

const register = async () => {
    loading.value = true;
    if (password.value !== passwordConfirm.value) {
        success.value = false;
        loading.value = false;
        errorMessage.value = 'Passwords do not match';
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    });

    if (!error) {
        navigateTo('/dashboard');
    } else {
        const errorCode = error.code;
        const errorMessageS = error.message;
        console.log(errorCode, errorMessageS);
        errorMessage.value = errorMessageS;
        success.value = false;
        loading.value = false;
    }
};

const signInWithGoogle = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { 
                redirectTo: '/dashboard',
            },
        });
    } catch (error) {
        console.error('Google Sign-In Error:', error);
    }
};
</script>

<template>
    <div class="flex items-center justify-center h-screen ">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required v-model="email" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2">
                            <Label for="password1">Password</Label>
                            <Input id="password1" placeholder="password" type="password" required v-model="password" />
                        </div>
                        <div class="grid gap-2">
                            <Label for="password2">Password again</Label>
                            <Input id="password2" placeholder="password" type="password" required
                                v-model="passwordConfirm" />
                        </div>
                    </div>

                    <Alert v-if="errorMessage != ''" variant="destructive">
                        <AlertCircle class="w-4 h-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {{ errorMessage }}
                        </AlertDescription>
                    </Alert>

                    <Button @clik="register" type="submit" class="w-full">
                        <div v-if="loading" aria-label="Loading..." role="status"
                            class="align-middle justify-center flex">
                            <svg class="animate-spin w-6 h-6 fill-slate-800" viewBox="3 3 18 18">
                                <path class="opacity-20"
                                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                                </path>
                                <path
                                    d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                                </path>
                            </svg>
                        </div>
                        <div v-else>
                            Create an account
                        </div>
                    </Button>
                    <Button @click="signInWithGoogle" variant="outline" class="w-full">
                        <svg class="w-6 h-6 mx-2" viewBox="0 0 40 40">
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#FFC107" />
                            <path
                                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                fill="#FF3D00" />
                            <path
                                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                fill="#4CAF50" />
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#1976D2" />
                        </svg>
                        Sign up with GitHub
                    </Button>
                </div>
                <div class="mt-4 text-center text-sm">
                    Already have an account?
                    <NuxtLink to="/auth/login" class="underline">
                        Sign in
                    </NuxtLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>