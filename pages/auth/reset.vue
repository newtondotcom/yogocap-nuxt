<script setup lang="ts">
definePageMeta({
    layout: 'false',
})
let email = ref("");
let loading = ref(false);
let success = ref(false);

const supabase = useSupabaseClient();

const login = async () => {
    loading = true;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)

        .then(() => {
            success = true;
            loading = false;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            success = false;
            loading = false;
        });
};
</script>


<template>
    <section class="bg-white ">
        <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form class="w-full max-w-md" @submit.prevent="login">
                <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="">

                <h1 class="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl ">reset your password</h1>

                <div v-if="!success" class="relative flex items-center mt-8">
                    <span class="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 " fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>

                    <input type="email"
                        class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Email address" required bind:value={email}>
                </div>

                <div class="mt-6">
                    <button type="submit"
                        class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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
                            {{ !loading && "Send email to reset password" }}
                        </div>
                    </button>

                    <div class="mt-6 text-center ">
                        <NuxtLink to="/auth/register" class="text-sm text-blue-500 hover:underline ">
                            Don’t have an account yet? Register
                        </NuxtLink>
                    </div>
                </div>
                <div v-if="success" class="mt-6 text-center">
                    <p class="text-sm text-gray-500 ">
                        We have sent you an email with a link to reset your password.
                    </p>
                    <NuxtLink to="/auth/login" class="text-sm text-blue-500 hover:underline ">
                        Login now
                    </NuxtLink>
                </div>
            </form>
        </div>
    </section>
</template>