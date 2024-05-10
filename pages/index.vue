<script setup lang="ts">
definePageMeta({
    layout: false,
})
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'

onMounted(() => {
    toast('At inscription, you receive a free Starter Plan', {
            description: 'Enjoy it now ! 🎉',
            /*
            action: {
            label: 'Ok',
            onClick: () => navigateTo('/auth/login'),
            },
            */
            action: {
            label: 'Got it',
            onClick: () => {},
            },
        })
    })
</script>

<template>
    <Toaster />
    <LandingHeader />
    <LandingAbout />
    <LandingPricing />
    <LandingFeatures />
    <LandingHow />
    <!--<LandingStats />-->
    <!--<LandingTeam />-->
    <LandingFooter />
</template>