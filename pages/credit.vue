<script setup lang="ts">
    import { useToast } from '@/components/ui/toast/use-toast';
    import constants from '~/lib/constants';
    import { Ban, Check } from 'lucide-vue-next';

    const { toast } = useToast();

    const current_plan = ref('');
    const videos_remaining = ref(0);
    const max_video_duration_min = ref(0);
    const max_video_duration_sec = ref(0);
    const max_video_allowed = ref(0);
    const can_emojis = ref(false);
    const redeem_loading = ref(false);
    const code_to_redeem = ref('');

    let text = 'Buy now';

    let array = {
        starter: '',
        pro: '',
        business: '',
    };

    async function getCredit() {
        const data = await $fetch('/api/dashboard/credit');
        console.log(data);
        current_plan.value = data.current_plan.plan
            ?.split('-')[1]
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase());
        videos_remaining.value = data.account?.videos_remaining;
        let max_video_duration = data.account?.current_duration;
        max_video_duration_min.value = Math.floor(max_video_duration / 60);
        max_video_duration_sec.value = max_video_duration % 60;
        if (data.current_plan?.plan === constants.SLUG_PLAN_SLOW) {
            max_video_allowed.value = constants.NB_VIDEOS_SLOW;
        } else if (data.current_plan?.plan === constants.SLUG_PLAN_MEDIUM) {
            max_video_allowed.value = constants.NB_VIDEOS_MEDIUM;
        } else if (data.current_plan?.plan === constants.SLUG_PLAN_FAST) {
            max_video_allowed.value = constants.NB_VIDEOS_FAST;
        } else {
            max_video_allowed.value = constants.NB_VIDEOS_JOIN;
        }
        can_emojis.value = data.account?.can_emojis;
    }

    onMounted(async () => {
        getCredit();
        const data = await $fetch(`/api/lemon/products`);
        array.starter = data.starter;
        array.pro = data.pro;
        array.business = data.business;
    });

    function actionPricing(plan: string) {
        if (plan === constants.SLUG_PLAN_SLOW) {
            window.location.href = array.starter;
        } else if (plan === constants.SLUG_PLAN_MEDIUM) {
            window.location.href = array.pro;
        } else if (plan === constants.SLUG_PLAN_FAST) {
            window.location.href = array.business;
        }
    }

    async function redeemCode() {
        redeem_loading.value = true;
        try {
            const data = await $fetch(`/api/dashboard/redeem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { code: code_to_redeem.value },
            });
            if (data == 'ok') {
                getCredit();
                code_to_redeem.value = '';
                toast({
                    title: 'Code redeemed',
                    description: 'Your code has been redeemed successfully',
                    status: 'success',
                });
            }
            if (data == 'used') {
                toast({
                    title: 'Code already used',
                    description: 'Your code has already been used',
                    status: 'error',
                });
            } else {
                toast({
                    title: 'Code not redeemed',
                    description: 'Your code has not been redeemed successfully',
                    status: 'error',
                });
                console.error(data);
            }
        } catch (error) {
            toast({
                title: 'Code not redeemed',
                description: 'Your code has not been redeemed successfully',
                status: 'error',
            });
            console.error(error);
        } finally {
            redeem_loading.value = false;
        }
    }
</script>

<template>
    <DashboardSubtitle title="Credit" subtitle="Here is your credit page ! ⏳" />

    <div class="flex-column my-8 flex justify-center align-middle sm:mt-12">
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
                <dt class="order-last text-lg font-medium text-gray-400">current Plan</dt>

                <dd
                    class="flex flex-row justify-center align-middle text-3xl font-extrabold text-primary-foreground md:text-5xl"
                >
                    {{ current_plan }}
                </dd>
            </div>

            <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
                <dt class="order-last text-lg font-medium text-gray-400">videos remaining</dt>

                <dd
                    class="flex flex-row justify-center align-middle text-4xl font-extrabold text-primary-foreground md:text-5xl"
                >
                    {{ videos_remaining }}
                    <span class="text-2xl text-gray-400">/{{ max_video_allowed }}</span>
                </dd>
            </div>

            <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
                <dt class="order-last text-lg font-medium text-gray-400">max duration per video</dt>

                <dd
                    class="flex flex-row justify-center align-middle text-4xl font-extrabold text-primary-foreground md:text-5xl"
                >
                    {{ max_video_duration_min }}
                    <span class="text-2xl text-gray-400">min</span>
                    <span class="text-2xl text-primary-foreground">
                        {{ max_video_duration_sec }}
                    </span>
                </dd>
            </div>
        </dl>
    </div>

    <div class="flex justify-center">
        <Badge variant="secondary" v-if="can_emojis">
            You can add AI generated Emojis
            <Check class="ml-2 h-4 w-4" />
        </Badge>
        <Badge variant="secondary" v-else>
            You can't add AI generated Emojis. Please consider upgrading your plan !
            <Ban class="ml-2 h-4 w-4" />
        </Badge>
    </div>

    <DashboardSubtitle title="Top up" subtitle="Top up your account ! ⛽" />

    <div class="flex flex-row justify-center items-center space-x-4">
        <div class="">Redeem a code</div>
        <Input id="email" type="text" v-model="code_to_redeem" placeholder="Code" class="w-40" />
        <Button @click="redeemCode">
            <div v-if="!redeem_loading">Redeem</div>
            <div v-else>
                <svg
                    class="m-1 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                </svg>
            </div>
        </Button>
    </div>

    <div class="flex flex-row justify-center items-center mt-4">
        <Separator class="w-[60%] items-center" label="Or" />
    </div>

    <LandingPricing :action="actionPricing" :text />
</template>
