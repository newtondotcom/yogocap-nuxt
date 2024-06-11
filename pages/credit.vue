<script setup lang="ts">
import constants from '~/lib/constants';

const current_plan = ref('')
const videos_remaining = ref(0)
const max_video_duration_min = ref(0)
const max_video_duration_sec = ref(0)
const max_video_allowed = ref(0)

let text = "Buy now"


let array = {
  starter: '',
  pro: '',
  business: ''
}

async function getCredit() {
  const data = await $fetch('/api/dashboard/credit')
  console.log(data)
  current_plan.value = data.current_plan.plan?.split("-")[1].toLowerCase().replace(/^\w/, c => c.toUpperCase());
  videos_remaining.value = data.account?.videos_remaining
  let max_video_duration = data.account?.current_duration
  max_video_duration_min.value = Math.floor(max_video_duration / 60)
  max_video_duration_sec.value = max_video_duration % 60
  if (data.current_plan?.plan === constants.SLUG_PLAN_SLOW) {
    max_video_allowed.value = constants.NB_VIDEOS_SLOW
  } else if (data.current_plan?.plan === constants.SLUG_PLAN_MEDIUM) {
    max_video_allowed.value = constants.NB_VIDEOS_MEDIUM
  } else if (data.current_plan?.plan === constants.SLUG_PLAN_FAST) {
    max_video_allowed.value = constants.NB_VIDEOS_FAST
  } else {
    max_video_allowed.value = constants.NB_VIDEOS_JOIN
  }
}

onMounted(async () => {
  getCredit()
  const data = await $fetch(`/api/lemon/products`)
  array.starter = data.starter
  array.pro = data.pro
  array.business = data.business
});

function actionPricing(plan : string){
  if (plan === constants.SLUG_PLAN_SLOW) {
    window.location.href = array.starter
  } else if (plan === constants.SLUG_PLAN_MEDIUM) {
    window.location.href = array.pro
  } else if (plan === constants.SLUG_PLAN_FAST) {
    window.location.href = array.business
  }
}

// QUAND ON CLIQUE SUR UN PLAN, CA SELECTIoNNE L OPTION DANS LE MENU SELECT
// POUR CELA, IL FAUT DEBUNK LE COMPOSANT PRICING

</script>

<template>

  <DashboardSubtitle title="Credit" subtitle="Here is your credit page ! ⏳" />

  <div class="my-8 sm:mt-12 flex-column flex align-middle justify-center">
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">

      <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
        <dt class="order-last text-lg font-medium text-gray-400">
          Current Plan
        </dt>

        <dd
          class="text-3xl font-extrabold text-primary-foreground md:text-5xl flex-row flex align-middle justify-center">
          {{ current_plan }}
        </dd>
      </div>

      <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
        <dt class="order-last text-lg font-medium text-gray-400">
          videos remaining
        </dt>

        <dd
          class="text-4xl font-extrabold text-primary-foreground md:text-5xl flex-row flex align-middle justify-center">
          {{ videos_remaining }}
          <span class="text-gray-400 text-2xl"> /{{ max_video_allowed }}</span>
        </dd>
      </div>


      <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
        <dt class="order-last text-lg font-medium text-gray-400">
          Max video duration
        </dt>

        <dd
          class="text-4xl font-extrabold text-primary-foreground md:text-5xl flex-row flex align-middle justify-center">
          {{ max_video_duration_min }}
          <span class="text-gray-400 text-2xl">min</span>
          <span class="text-primary-foreground text-2xl">{{ max_video_duration_sec }}</span>
        </dd>
      </div>
    </dl>
  </div>


  <DashboardSubtitle title="Top up" subtitle="Top up your account ! ⛽" />

  <LandingPricing :action="actionPricing" :text />

</template>