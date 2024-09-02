<script setup lang="ts">
    import constants from '~/lib/constants';
    import { AlertCircle } from 'lucide-vue-next';

    const supabase = useSupabaseClient();

    async function accountClosing() {
        await $fetch('/api/miscs/user-deletion');
        logout();
    }

    async function logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        }
        navigateTo('/');
    }
</script>

<template>
    <DashboardSubtitle title="Settings" subtitle="Here is your settings page ! 🚀" />
    <div class="p-8">
        <div class="mb-4 flex justify-center">
            You can monitor the status of our services on our
            <NuxtLink
                to="https://status.yogocap.com/status/infra"
                class="ml-1 font-bold text-primary"
            >
                status page
            </NuxtLink>
            .
        </div>

        <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Reminder</AlertTitle>
            <AlertDescription>
                The subtitled videos are stored on the server for
                {{ constants.NB_DAYS_DELETE }} days. After that, they are automatically deleted.
            </AlertDescription>
        </Alert>
    </div>
    <div class="flex justify-center">
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive">Close your account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account.
                        However, due to legal reasons, we will keep your data for 5 years. Note that
                        your decision can be reversed within 30 days by sending us an email.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="accountClosing">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>

    <div class="mt-10 flex justify-center">
        <Button @click="logout" variant="secondary">Log out</Button>
    </div>
</template>
