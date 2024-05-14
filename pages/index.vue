<script setup lang="ts">
definePageMeta({
    layout: false,
})
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'

const supabase = useSupabaseClient();

onMounted(() => {
    toast('At registration, you are gifted with a free Starter Plan', {
        description: 'Enjoy it now ! 🎉',
        /*
        action: {
        label: 'Ok',
        onClick: () => navigateTo('/auth/login'),
        },
        */
        action: {
            label: 'Got it',
            onClick: () => { },
        },
    })
})

async function actionPricing(plan : string){
    console.log('signing in with google');
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error('Google Sign-In Error:', error);
            return;
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error);
    }
}

</script>

<template>
    <Toaster />
    <LandingHeader />
    <LandingAbout />
    <LandingPricing :action="actionPricing" />
    <LandingFeatures />
    <LandingHow />
    <!--<LandingStats />-->
    <!--<LandingTeam />-->
    <LandingFooter />
</template>