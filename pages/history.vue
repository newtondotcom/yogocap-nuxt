<script setup lang="ts">
    import constants from '~/lib/constants';
    import { formatDistanceToNow } from 'date-fns';
    import { enUS } from 'date-fns/locale';

    const transactions = ref([]);
    const videos = ref([]);
    const dataFetched = ref(false);

    async function getHistory() {
        const data = await $fetch('/api/dashboard/history');
        transactions.value = data.transactions;
        transactions.value.map((item) => {
            item.plan = item.plan
                .split('-')[1]
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase());
            if (item.plan == constants.NAME_PLAN_SLOW) item.value = constants.PRICE_SLOW;
            if (item.plan == constants.NAME_PLAN_MEDIUM) item.value = constants.PRICE_MEDIUM;
            if (item.plan == constants.NAME_PLAN_FAST) item.value = constants.PRICE_FAST;
            if (item.plan == constants.NAME_PLAN_JOIN) item.value = constants.PRICE_JOIN;
        });
        videos.value = data.videos;
        videos.value.splice(50);
        dataFetched.value = true;
    }

    onMounted(() => {
        getHistory();
    });
</script>

<template>
    <DashboardSubtitle
        title="Transactions history"
        subtitle="Here is the list of your previous transactions ! 💲"
    />

    <div class="hidden md:flex overflow-x-auto rounded-lg border border-gray-200 mt-8 mx-4">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Plan chosen
                    </th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Amount</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <tr v-for="transaction in transactions">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div class="flex flex-row align-middle justify-center">
                            {{ transaction.date }}
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center">
                            {{ transaction.plan }}
                            <div
                                v-if="transaction.onjoin"
                                class="bg-clip-text bg-gradient-to-r from-yellow-400 to-green-600 ml-2"
                            >
                                -gifted-
                            </div>
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center">
                            {{ transaction.value }} €
                        </div>
                    </td>
                </tr>
                <SkeletonsHistoryTransactions v-if="!dataFetched" />
                <tr v-if="dataFetched && transactions.length == 0">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div class="flex flex-row align-middle justify-center"></div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center">
                            No transactions yet
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="md:hidden w-full h-full flex flex-col space-y-2">
        <SkeletonsHistoryMobile v-if="!dataFetched" />
        <div
            v-for="transaction in transactions"
            class="flex flex-col bg-secondary rounded-lg justify-center items-center"
        >
            <div class="whitespace-nowrap font-medium text-gray-900 flex flex-row">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost">
                                {{
                                    formatDistanceToNow(new Date(transaction.date), {
                                        locale: enUS,
                                    })
                                }}
                                ago
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{{ new Date(transaction.date).toLocaleDateString() }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div class="flex flex-row align-middle justify-center pb-2">
                Plan {{ transaction.plan }}
                <div class="mx-1">({{ transaction.value }} €)</div>
                <div v-if="transaction.onjoin" class="mx-2">
                    🌟
                    <span
                        class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-600"
                    >
                        gifted
                    </span>
                    🎁
                </div>
            </div>
        </div>
        <div v-if="dataFetched && transactions.length == 0">
            <div class="flex flex-row align-middle justify-center">No transactions yet</div>
        </div>
    </div>

    <DashboardSubtitle
        title="Videos history"
        subtitle="Here is the list of your latest 50 previous subtitled videos ! 📺"
    />

    <div
        class="hidden md:flex overflow-x-auto rounded-lg border border-gray-200 mt-8 mx-4 mb-[10%]"
    >
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Date of submission
                    </th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Lenght</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <tr v-for="video in videos">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div class="flex flex-row align-middle justify-center">
                            {{ video.name }}
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center">
                            {{ video.submitted }}
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center">
                            {{ video.length }}
                        </div>
                    </td>
                </tr>
                <SkeletonsHistoryVideos v-if="!dataFetched" />
                <tr v-if="videos.length == 0 && dataFetched">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div class="flex flex-row align-middle justify-center"></div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center"></div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center">No video yet</div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div class="flex flex-row align-middle justify-center"></div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="md:hidden w-full h-full flex flex-col space-y-2">
        <SkeletonsHistoryMobile v-if="!dataFetched" />
        <div
            v-for="video in videos"
            class="flex flex-col bg-secondary rounded-lg justify-center items-center"
        >
            <div class="whitespace-nowrap font-medium text-gray-900 flex flex-row">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="ghost">
                                {{
                                    formatDistanceToNow(new Date(video.submitted), { locale: enUS })
                                }}
                                ago
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{{ new Date(video.submitted).toLocaleDateString() }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div class="flex flex-row align-middle justify-center space-x-2 pb-2">
                <div class="">{{ video.length }}-second long video named</div>
                <div class="font-semibold">"{{ video.name }}"</div>
            </div>
        </div>
        <div v-if="dataFetched && transactions.length == 0">
            <div class="flex flex-row align-middle justify-center">No videos yet</div>
        </div>
    </div>
</template>
