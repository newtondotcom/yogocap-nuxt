<script setup lang="ts">
const select = ref('')
const current_plan = ref('')
const videos_remaining = ref(0)
const max_video_duration_min = ref(0)
const max_video_duration_sec = ref(0)
const max_video_allowed = ref(0)

let text = "Select"


let array = {
  starter: '',
  pro: '',
  business: ''
}

function submit() {
  if (select.value === 'ST') {
    window.location.href = array.starter
  } else if (select.value === 'PM') {
    window.location.href = array.pro
  } else if (select.value === 'BS') {
    window.location.href = array.business
  }
}

async function getCredit() {
  const data = await $fetch('/api/dashboard/credit')
  current_plan.value = data.current_plan?.plan.split('-')[1].toLowerCase().replace(/^\w/, c => c.toUpperCase());
  videos_remaining.value = data.account?.videos_remaining
  let max_video_duration = data.account?.current_duration
  max_video_duration_min.value = Math.floor(max_video_duration / 60)
  max_video_duration_sec.value = max_video_duration % 60
  if (data.current_plan?.plan === 'plan-starter') {
    max_video_allowed.value = 60
  } else if (data.current_plan?.plan === 'plan-premium') {
    max_video_allowed.value = 120
  } else if (data.current_plan?.plan === 'plan-business') {
    max_video_allowed.value = 300
  }
}

onMounted(async () => {
  select.value = 'ST'
  getCredit()
  const data = await $fetch(`/api/lemon/products`)
  array.starter = data.starter
  array.pro = data.pro
  array.business = data.business
});

function actionPricing(plan : string){
  if (plan === 'starter') {
    select.value = 'ST'
  } else if (plan === 'premium') {
    select.value = 'PM'
  } else if (plan === 'business') {
    select.value = 'BS'
  }
}

// QUAND ON CLIQUE SUR UN PLAN, CA SELECTIoNNE L OPTION DANS LE MENU SELECT
// POUR CELA, IL FAUT DEBUNK LE COMPOSANT PRICING

</script>

<template>
  <DashboardSubtitle title="Credit" subtitle="Here is your credit page ! ⏳" />

  <div class="mt-8 sm:mt-12 flex-column flex align-middle justify-center">
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

  <div class="max-w-2xl mx-auto mt-20">
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select an option</label>
    <select v-model="select"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
      <option selected disabled>Select an option</option>
      <option value="ST">Starter</option>
      <option value="PM">Premium</option>
      <option value="BS">Business</option>
    </select>
  </div>

  <div class="flex flex-row align-middle justify-center mt-8">
    <Button @click="submit">Top up</Button>
  </div>

  <LandingPricing :action="actionPricing" :text />
</template>