<script setup lang="ts">
definePageMeta({
    layout: false,
})
let email = ref("");
let loading = ref(false);
let success = ref(false);

const supabase = useSupabaseClient();

const sendEmail = async () => {
    loading.value = true;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.value)
        .then(() => {
            success.value = true;
            loading.value = false;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            success.value = false;
            loading.value = false;
        });
};
</script>


<template>
    <div class="flex items-center justify-center h-screen ">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl">
                    Reset your password
                </CardTitle>
                <CardDescription>
                    Enter your email below to reset your password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <Button v-if="!success" @click="sendEmail" type="submit" class="w-full">
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
                            Send the email
                        </div>
                    </Button>

                    <Alert v-else>
                        <Terminal class="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            You can add components to your app using the cli.
                        </AlertDescription>
                    </Alert>
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