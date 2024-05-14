<script setup lang="ts">
definePageMeta({
    layout: false,
})
import processSignIn from '@/lib/signin'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'

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
    await processSignIn()
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